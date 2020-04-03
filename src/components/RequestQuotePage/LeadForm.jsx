import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import {constants, calcUtils} from '@ergeon/3d-lib';

import {Button, Spinner} from '@ergeon/core-components';
import TextInput from 'components/common/TextInput';
import PhoneInput from './PhoneInput';
import MultiProductSelect from './MultiProductSelect';
import TextArea from '../common/TextArea';

import {
  createValidator,
  phone,
  email,
  required,
} from 'utils/validation';
import ls from 'local-storage';
import {
  submitLeadArrived,
} from 'api/lead';
import {parseError} from 'utils/utils';
import {
  identify,
  track,
  trackError,
  LS_KEY,
} from 'utils/analytics';
import {
  CUSTOMER_LEAD_CREATED,
} from 'utils/events';
import {DEFAULT_SOURCE_VALUE} from 'website/constants';
import {FENCE_SLUG, products} from '@ergeon/core-components/src/constants';

import './LeadForm.scss';
import {getEventData, getAdvancedEditorUrl} from '../../utils/utils';

const stringifyAddress = (address) => {
  if (address !== null && address !== undefined) {
    const addressParts = [
      address.primary_number,
      address.street_name,
      address.city_name,
      address.state_abbreviation,
      address.zipcode,
    ];
    return addressParts.join(', ');
  }
  return '';

};

const getInitialState = (showNoteField = false, props = {}) => {
  return {
    validateOnChange: false,
    showNoteField,
    data: {
      email: props.user && props.user.email || '',
      name: props.user && props.user.full_name || '',
      phone: props.user && props.user.phone_number || '',
      comment: '',
      'string_address': stringifyAddress(props.lead && props.lead.address),
    },
    errors: null,
    loading: false,
  };
};

export default class LeadForm extends React.Component {
  static propTypes = {
    configs: PropTypes.array,
    lead: PropTypes.object,
    onProductChange: PropTypes.func,
    onSubmit: PropTypes.func,
    product: PropTypes.string,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const validateField = {
      email: [required, email],
      phone: [required, phone],
      product: [required],
      name: [required],
    };
    this.validator = createValidator(validateField);
    this.state = getInitialState(false, props);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const {lead, user, onSubmit, product} = this.props;
    const data = {
      ...this.state.data,
      product,
    };
    const errors = this.validator(data);
    if (errors) {
      this.setState({
        errors,
        validateOnChange: true,
      });
    } else {
      this.setState({
        loading: true,
        errors: null,
      });
      const submitData = getEventData(data);
      const order = this.getOrder();
      submitData['address'] = data.address || lead.address;
      if (product === FENCE_SLUG) {
        submitData['object'] = {...submitData.object, order};
      }
      if (!user) {
        submitData['auto_sign_in'] = true;
      }
      Sentry.addBreadcrumb({
        message: 'Lead submit',
        category: 'action',
        data: submitData,
      });

      try {
        await submitLeadArrived(submitData);
        await identify(data);
        await track(CUSTOMER_LEAD_CREATED, {...submitData, source: DEFAULT_SOURCE_VALUE});
      } catch (error) {
        trackError(new Error(`Lead submit error: ${parseError(error)}`));
        this.setState({
          errors: {
            global: parseError(error),
          },
          loading: false,
        });
      }

      this.setState(getInitialState(false, this.props));
      onSubmit && onSubmit();
      ls.remove(LS_KEY);
    }
  }

  handleAddNote = () => {
    this.setState({
      showNoteField: true,
    });
  };

  handleFieldChange = (name, value) => {
    const {data, validateOnChange} = this.state;
    const newState = {
      data: {
        ...data,
        'string_address' : stringifyAddress(name === 'address' ? value : this.props.lead.address),
        [name]: value,
      },
    };

    if (validateOnChange) {
      newState.errors = this.validator(newState.data);
    }

    this.setState(newState);

    if (name === 'product' && this.props.onProductChange && value !== this.props.product) {
      this.props.onProductChange(value);
    }
  };

  getOrder() {
    const {lead} = this.props;
    const {CATALOG_TYPE_FENCE, CATALOG_ID_FENCE, CATALOG_ID_GATE} = constants;

    return this.props.configs.map(item => {
      let schema = calcUtils.getParams(`?${item.code}`).schema.split(',');
      schema = schema.map(number => parseInt(number, 10));
      const code = calcUtils.getParams(`?${item.code}`).code.split(',');
      return {
        advancedEditorUrl: getAdvancedEditorUrl(
          {schema, code, 'catalog_type': item.catalog_type},
          lead.address.zipcode
        ),
        'catalog_type': item.catalog_type,
        'catalog_id': item.catalog_type === CATALOG_TYPE_FENCE ? CATALOG_ID_FENCE : CATALOG_ID_GATE,
        schema,
        code,
        description: item.description,
        price: item.price,
        units: item.units,
      };
    });
  }

  render() {
    const {product} = this.props;
    const {data: {email, name, phone, comment}, errors, loading, showNoteField} = this.state;
    const multiSelectProducts = products.map(function(productItem) {
      return {value: productItem.slug, label: productItem.name};
    });

    const multiSelectChosenProduct = multiSelectProducts.find(
      multiSelectProduct => multiSelectProduct.value === product
    );

    return (
      <form className="Form LeadForm" onSubmit={this.handleSubmit.bind(this)}>
        <div className={classNames('Form-field', {'is-error': errors && errors.product})}>
          <MultiProductSelect
            isMulti={false}
            label="Ergeon services:"
            name="product"
            onChange={this.handleFieldChange}
            value={multiSelectChosenProduct} />
          {errors && <div className="Form-error">{errors.product}</div>}
        </div>
        <div className={classNames('Form-field', {'is-error': errors && errors.name})}>
          <TextInput
            disabled={loading}
            labelName="Your name"
            name="name"
            onChange={this.handleFieldChange}
            placeholder="e.g. John Smith"
            type="text"
            value={name} />
          {errors && <div className="Form-error">{errors.name}</div>}
        </div>
        <div className={classNames('Form-field', {'is-error': errors && errors.phone})}>
          <PhoneInput
            disabled={loading}
            labelName="Your phone number"
            name="phone"
            onChange={this.handleFieldChange}
            placeholder="(555) 123-4567"
            type="text"
            value={phone} />
          {errors && <div className="Form-error">{errors.phone}</div>}
        </div>
        <div className={classNames('Form-field', {'is-error': errors && errors.email})}>
          <TextInput
            disabled={loading}
            labelName="Email"
            name="email"
            onChange={this.handleFieldChange}
            placeholder="e.g. username@mail.com"
            type="email"
            value={email} />
          {errors && <div className="Form-error">{errors.email}</div>}
        </div>
        {showNoteField === false ? (
          <div className="Form-field">
            <a
              className="Form-Note"
              onClick={this.handleAddNote}>
              Add a note
            </a>
          </div>
        ) : (
          <div className={classNames('Form-field', {'is-error': errors && errors.comment})}>
            <TextArea
              disabled={loading}
              labelName="Note"
              name="comment"
              onChange={this.handleFieldChange}
              placeholder="Add your note here"
              type="text"
              value={comment} />
            {errors && <div className="Form-error">{errors.comment}</div>}
          </div>
        )}
        <div className="Form-actions">
          {errors && <div className="Form-error">{errors.global}</div>}
          <Button
            className={classNames('AddressButton', {'is-loading': loading})}
            disabled={loading}
            size="large"
            type="submit">{loading ? <Spinner active={true} borderWidth={0.10} size={25} /> : 'Get a quote'}</Button>
        </div>
        <div className="Form-footer">
          By creating an account, you agree to the <br />
          <a href="https://s3-us-west-2.amazonaws.com/ergeon-terms/terms-of-use.pdf" rel="noopener noreferrer" target="_blank" >Terms of Use</a> and <a
            href="https://s3-us-west-2.amazonaws.com/ergeon-terms/privacy-policy.pdf" rel="noopener noreferrer" target="_blank">Privacy Policy</a>
        </div>
      </form>
    );
  }
}
