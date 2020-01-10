import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import {constants, calcUtils} from '@ergeon/3d-lib';

import {AddressInput, Button, Spinner} from '@ergeon/core-components';
import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import MultiProductSelect from './MultiProductSelect';
import TextArea from '../common/TextArea';

import {
  createValidator,
  phone,
  email,
  required,
  fullAddress,
} from 'utils/validation';
import ls from 'local-storage';
import {
  submitLeadArrived,
} from 'api/lead';
import {
  parseError,
} from 'utils/utils';
import {
  identify,
  track,
  trackError,
  LS_KEY,
} from 'utils/analytics';
import {
  CUSTOMER_LEAD_CREATED,
} from 'utils/events';
import {products, DEFAULT_SOURCE_VALUE} from 'website/constants';

import './LeadForm.scss';
import {getEventData} from '../../utils/utils';

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
      email: '',
      name: '',
      phone: '',
      comment: '',
      product: props.product,
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
    showAddressInput: PropTypes.bool,
    showProductField: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const validateField = {
      email: [required, email],
      phone: [required, phone],
      product: [required],
      name: [required],
    };
    if (props.showAddressInput) {
      validateField.address = [required, fullAddress];
    }
    this.validator = createValidator(validateField);
    this.state = getInitialState(false, props);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {lead, onSubmit} = this.props;
    const {data} = this.state;
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
      submitData['address'] = data.address || lead.address;
      submitData['object'] = {...submitData.object, order: this.getOrder()};
      Sentry.addBreadcrumb({
        message: 'Lead submit',
        category: 'action',
        data: submitData,
      });
      submitLeadArrived({
        ...submitData,
        order: this.getOrder(),
      }).then((res) => {
        identify(data);
        track(CUSTOMER_LEAD_CREATED, {
          ...submitData,
          source: DEFAULT_SOURCE_VALUE,
        });
        this.setState(getInitialState(false, this.props));
        onSubmit && onSubmit();
        ls.remove(LS_KEY);
        return res;
      }, (error) => {
        trackError(new Error(`Lead submit error: ${parseError(error)}`, submitData));
        this.setState({
          errors: {
            global: parseError(error),
          },
          loading: false,
        });
      });
    }
  };

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

    if (name === 'product' && this.props.onProductChange) {
      this.props.onProductChange(value);
    }
  };

  getOrder() {
    const {CATALOG_TYPE_FENCE, CATALOG_ID_FENCE, CATALOG_ID_GATE} = constants;

    return this.props.configs.map(item => {
      let schema = calcUtils.getParams(`?${item.code}`).schema.split(',');
      schema = schema.map(number => parseInt(number, 10));
      const code = calcUtils.getParams(`?${item.code}`).code.split(',');
      return {
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
    const {showAddressInput} = this.props;
    const {data: {email, name, phone, product, comment}, errors, loading, showNoteField} = this.state;
    const multiselectProducts = products.map(function(productItem) {
      return {value: productItem.slug, label: productItem.name};
    });

    const multiselectChoosenProduct = multiselectProducts.find(
      multiselectProduct => multiselectProduct.value === product
    );

    return (
      <form className="Form LeadForm" onSubmit={this.handleSubmit}>
        {this.props.showProductField && <div className={`Form-field ${errors && errors.product && 'is-error'}`}>
          <label className="label spacing after__is-12">Ergeon services:</label>
          <MultiProductSelect
            isMulti={false}
            name="product"
            onChange={this.handleFieldChange}
            value={multiselectChoosenProduct} />
          {errors && <div className="Form-error">{errors.product}</div>}
        </div>}
        <div className={`Form-field ${errors && errors.name && 'is-error'}`}>
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
        <div className={`Form-field ${errors && errors.phone && 'is-error'}`}>
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
        <div className={`Form-field ${errors && errors.email && 'is-error'}`}>
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
          <div className={`Form-field ${errors && errors.comment && 'is-error'}`}>
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
        {showAddressInput && <div className={`Form-field ${errors && errors.address && 'is-error'}`}>
          <AddressInput
            onChange={(address) => this.handleFieldChange('address', address)}
            showButton={false} />
          {errors && <div className="Form-error">{errors.address}</div>}
        </div>}
        <div className="Form-actions">
          {errors && <div className="Form-error">{errors.global}</div>}
          <Button
            className={`AddressButton ${loading && 'is-loading'}`}
            disabled={loading}
            size="large"
            type="submit">{loading ? <Spinner active={true} borderWidth={0.10} size={25} /> : 'Get a quote'}</Button>
        </div>
        <div className="Form-footer">
          By creating an account, you agree to the <br />
          <a href="https://s3-us-west-2.amazonaws.com/ergeon-terms/terms-of-use.pdf">Terms of Use</a> and <a
            href="https://s3-us-west-2.amazonaws.com/ergeon-terms/privacy-policy.pdf">Privacy Policy</a>
        </div>
      </form>
    );
  }
}
