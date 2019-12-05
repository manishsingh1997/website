import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import cleanDeep from 'clean-deep';

import {AddressInput, Button, Spinner} from '@ergeon/core-components';
import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import MultiProductSelect from './MultiProductSelect';
import TextArea from './TextArea';

import {
  createValidator,
  phone,
  email,
  required,
  fullAddress,
} from 'libs/utils/validation';
import ls from 'local-storage';
import {
  submitLeadArrived,
} from 'libs/api';
import {
  parseError,
} from 'libs/utils/utils';
import {
  identify,
  track,
  trackError,
  getUTM,
  getUserAgent,
  getUserUuid,
  LS_KEY,
} from 'libs/utils/analytics';
import {
  CUSTOMER_LEAD_CREATED,
} from 'libs/utils/events';
import {products, DEFAULT_SOURCE_VALUE} from 'libs/constants';

import './LeadForm.scss';

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
    lead: PropTypes.object,
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
      const {savedAt, ...utms} = getUTM();
      let submitData = {
        ...data,
        uuid: getUserUuid(),
        object: {
          ...utms,
          ...getUserAgent(),
          'utm_source': utms['utm_source'] || 'website',
          pathname: window.location.pathname,
          'arrival_time': savedAt,
          'user_ip': window.userip,
          'inner_width': window.innerWidth,
          'inner_height': window.innerHeight,
          href: window.location.href,
          search: window.location.search,
        },
        address: data.address || lead.address,
        source: DEFAULT_SOURCE_VALUE,
      };
      submitData = cleanDeep(submitData);
      Sentry.addBreadcrumb({
        message: 'Lead submit',
        category: 'action',
        data: submitData,
      });
      submitLeadArrived(submitData).then((res) => {
        identify(data);
        track(CUSTOMER_LEAD_CREATED, {
          email: data.email,
          name: data.name,
          phone: data.phone,
          comment: data.comment,
          product: data.product,
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
  };

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
              href="#"
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