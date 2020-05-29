import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import {constants, calcUtils} from '@ergeon/3d-lib';

import {Button, Spinner} from '@ergeon/core-components';
import {getBaseEventData} from '@ergeon/erg-utms';
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
import {
  submitLeadArrived,
} from 'api/lead';
import {
  parseError,
  showUpcomingFeatures,
} from 'utils/utils';
import {
  identify,
  track,
  trackError,
  trackTawkLeadEvent,
} from 'utils/analytics';
import {
  CUSTOMER_LEAD_CREATED,
} from 'utils/events';
import {DEFAULT_SOURCE_VALUE} from 'website/constants';
import {FENCE_SLUG, products} from '@ergeon/core-components/src/constants';

import './LeadForm.scss';
import {getAdvancedEditorUrl} from '../../utils/utils';

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
    onAddConfigClick: PropTypes.func.isRequired,
    onProductChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
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

      const baseEventData = await getBaseEventData();
      const eventData = {
        ...baseEventData,
        ...data,
        address: data.address || lead.address,
      };
      const order = this.getOrder();
      if (product === FENCE_SLUG) {
        eventData['object'] = {...eventData.object, order};
      }
      if (showUpcomingFeatures() && !user) {
        eventData['auto_sign_in'] = true;
      }
      Sentry.addBreadcrumb({
        message: 'Lead submit',
        category: 'action',
        data: eventData,
      });

      try {
        await submitLeadArrived(eventData);
        await trackTawkLeadEvent(eventData);
        await identify(data);
        await track(CUSTOMER_LEAD_CREATED, {...eventData, source: DEFAULT_SOURCE_VALUE});
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
    }
  }

  handleAddNote = () => {
    this.setState({
      showNoteField: true,
    });
  };

  handleAddConfig = () => {
    const {onAddConfigClick} = this.props;
    onAddConfigClick();
  }

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
          lead.address && lead.address.zipcode
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
    const {product, lead: {address}} = this.props;
    const {data: {email, name, phone, comment}, errors, loading, showNoteField} = this.state;
    const multiSelectProducts = products.map(function(productItem) {
      return {value: productItem.slug, label: productItem.name};
    });

    const multiSelectChosenProduct = multiSelectProducts.find(
      multiSelectProduct => multiSelectProduct.value === product
    );
    const addConfigLinkClasses = classNames({
      'add-config__disable': !address || product !== FENCE_SLUG,
    });
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
        <div className="Form-action-links">
          {showNoteField === false ? (
            <div className="spacing after__is-12">
              <a
                className="action-link"
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
          <div className={addConfigLinkClasses}>
            <a
              className="action-link"
              onClick={this.handleAddConfig}>
              Design your Fence or Gate
            </a>
            <label className="label">And get an estimate instantly</label>
          </div>
        </div>

        <div className="Form-actions">
          {errors && <div className="Form-error">{errors.global}</div>}
          <Button
            className={classNames('AddressButton', {'is-loading': loading})}
            disabled={loading}
            size="large"
            type="submit">{loading ? <Spinner active={true} borderWidth={0.10} size={25} /> : 'Get a quote'}</Button>
        </div>
      </form>
    );
  }
}
