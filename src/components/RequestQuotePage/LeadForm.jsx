import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isEmail from 'sane-email-validation';
import * as Sentry from '@sentry/browser';
import {constants, calcUtils} from '@ergeon/3d-lib';
import {RadioGroup} from 'react-radio-group';
import {Button, FormField, PhoneInput, Spinner, Input, RadioButton} from '@ergeon/core-components';
import {getBaseEventData} from '@ergeon/erg-utms';

import AddNote from './AddNote';

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
import {DRIVEWAY_SLUG, FENCE_SLUG} from '@ergeon/core-components/src/constants';

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
      product: FENCE_SLUG,
      'string_address': stringifyAddress(props.lead && props.lead.address),
    },
    validFields: null,
    errors: null,
    loading: false,
  };
};

export default class LeadForm extends React.Component {
  static propTypes = {
    configs: PropTypes.array,
    lead: PropTypes.object,
    mobileAddressField: PropTypes.node,
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
    const validFields = {};
    Object.keys(data).forEach(key => {
      validFields[key] = !(errors && key in errors);
    });
    if (errors) {
      this.setState({
        errors,
        validFields,
        validateOnChange: true,
      });
    } else {
      this.setState({
        validFields,
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
      if (showUpcomingFeatures()) {
        eventData['is_upcoming_features_enabled'] = true;
        if (!user) {
          eventData['auto_sign_in'] = true;
        }
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
        trackError(new Error('Lead submit error'), {error});
        this.setState({
          errors: {
            global: parseError(error) || 'Unknown error',
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
  handleRemoveNote = () => {
    this.setState({
      showNoteField: false,
      data: {...this.state.data, comment: ''},
    });
  };
  handleAddConfig = () => {
    const {onAddConfigClick} = this.props;
    onAddConfigClick();
  }
  handleFieldChange = (event, name, value) => {
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
      let validFields = {};
      Object.keys(newState.data).forEach(key => {
        let valid = true;
        if (newState.errors && key in newState.errors) valid = false;
        validFields[key] = valid;
      });
      newState.validFields = validFields;
    }

    this.setState(newState);

    if (name === 'product' && value !== this.props.product) {
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
    const {lead: {address}, mobileAddressField, product} = this.props;
    const {data: {email, name, phone, comment}, errors, loading, showNoteField, validFields} = this.state;
    const addConfigLinkClasses = classNames({
      'add-config__disable': !address || product !== FENCE_SLUG,
    });
    return (
      <form className="Form LeadForm" onSubmit={this.handleSubmit.bind(this)}>
        <FormField>
          <label className="label">Ergeon service:</label>
          <RadioGroup
            name="ergeon-service"
            onChange={value => this.handleFieldChange('product', value)}
            selectedValue={this.props.product}>
            <ul className="product-radio-list no-padding">
              <RadioButton value={FENCE_SLUG}>
                Fences & Gates
              </RadioButton>
              <RadioButton value={DRIVEWAY_SLUG}>
                Driveways & Patios
              </RadioButton>
            </ul>
          </RadioGroup>
        </FormField>
        {mobileAddressField && mobileAddressField}
        <FormField>
          <Input
            disabled={loading}
            label="Your name"
            name="name"
            onChange={this.handleFieldChange.bind(this)}
            placeholder="e.g. John Smith"
            valid={validFields?.name || !!name}
            validationMessage={errors?.name}
            value={name} />
        </FormField>
        <FormField>
          <PhoneInput
            disabled={loading}
            label="Your phone number"
            name="phone"
            onChange={this.handleFieldChange.bind(this)}
            valid={validFields?.phone || !(/_/).test(phone) || null}
            validationMessage={errors?.phone}
            value={phone} />
        </FormField>
        <FormField>
          <Input
            disabled={loading}
            label="Email"
            name="email"
            onChange={this.handleFieldChange.bind(this)}
            placeholder="e.g. username@mail.com"
            type="email"
            valid={validFields?.email || isEmail(email || '') || null}
            validationMessage={errors?.email}
            value={email} />
        </FormField>
        <div className="Form-action-links">
          <AddNote
            comment={comment}
            errors={errors}
            handleAddNote={this.handleAddNote.bind(this)}
            handleFieldChange={this.handleFieldChange.bind(this)}
            handleRemoveNote={this.handleRemoveNote.bind(this)}
            loading={loading}
            showNoteField={showNoteField}/>
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
