import classNames from 'classnames';
import React, {ReactNode} from 'react';
import * as Sentry from '@sentry/browser';
import {constants, calcUtils, CatalogType} from '@ergeon/3d-lib';
// @ts-ignore
import {RadioGroup} from 'react-radio-group';
import {Button, Checkbox, FormField, PhoneInput, Spinner, Input, RadioButton} from '@ergeon/core-components';
import {UPCOMING_FEATURES_PARAM} from '@ergeon/erg-utils-js';
// @ts-ignore
import {getBaseEventData} from '@ergeon/erg-utms';
// @ts-ignore
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';
import {createValidator, phone, email, required} from '../../utils/validation';
import {submitLeadArrived} from '../../api/lead';
import {identify, track, trackError, trackTawkLeadEvent} from '../../utils/analytics';
import {CUSTOMER_LEAD_CREATED} from '../../utils/events';
import {DEFAULT_SOURCE_VALUE} from '../../website/constants';
import {parseError, showUpcomingFeatures, getAdvancedEditorUrl} from '../../utils/utils';
import AddNote from './AddNote';
import {Address, Config, Lead, User} from './types';
import './LeadForm.scss';

type LeadFormProps = {
  configs: Config[];
  lead: Lead | null;
  mobileAddressField: ReactNode;
  onAddConfigClick: () => void;
  onProductChange: (value: string) => void;
  onSubmit: () => void;
  product: string;
  user: User | null;
};

type LeadFormState = {
  validateOnChange: boolean;
  showNoteField: boolean;
  data: {
    email: string;
    name: string;
    phone: string;
    comment: string;
    product: string;
    string_address: string;
    is_subscribed_to_news: boolean;
    address?: Address;
  };
  validFields: Record<string, boolean> | null;
  errors: Record<string, string> | null;
  loading: boolean;
};

const stringifyAddress = (address?: Address | null) => {
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

const getInitialState = (showNoteField = false, props: LeadFormProps) => {
  return {
    validateOnChange: false,
    showNoteField,
    data: {
      email: (props.user && props.user.email) || '',
      name: (props.user && props.user.full_name) || '',
      phone: (props.user && props.user.phone_number) || '',
      comment: '',
      product: FENCE_SLUG,
      string_address: stringifyAddress(props.lead && props.lead?.address),
      is_subscribed_to_news: true,
    },
    validFields: null,
    errors: null,
    loading: false,
  };
};

export default class LeadForm extends React.Component<LeadFormProps, LeadFormState> {
  validator: (values: unknown) => Record<string, string> | null;

  constructor(props: LeadFormProps) {
    super(props);
    const validateField = {
      email: [required, email],
      phone: [required, phone],
      product: [required],
      name: [required],
    };
    // @ts-ignore
    this.validator = createValidator(validateField);
    this.state = getInitialState(false, props);
  }
  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const {lead, user, onSubmit, product} = this.props;
    const data = {
      ...this.state.data,
      product,
    };
    const errors = this.validator(data);
    const validFields: Record<string, boolean> = {};
    Object.keys(data).forEach((key) => {
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
        address: data.address || lead?.address,
      };
      const order = this.getOrder();
      if (product === FENCE_SLUG) {
        eventData['object'] = {...eventData.object, order};
      }
      if (showUpcomingFeatures('ENG-1XX')) {
        eventData[UPCOMING_FEATURES_PARAM] = true;
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
        trackTawkLeadEvent(eventData);
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
  };

  handleFieldChange(_event: React.FormEvent<HTMLInputElement>, name: string, value: string | Address) {
    const {data, validateOnChange} = this.state;
    const newState = {
      ...this.state,
      data: {
        ...data,
        string_address: stringifyAddress(name === 'address' ? (value as Address) : this.props.lead?.address),
        [name]: value,
      },
    };

    if (validateOnChange) {
      newState.errors = this.validator(newState.data);
      const validFields: Record<string, boolean> = {};
      Object.keys(newState.data).forEach((key) => {
        let valid = true;
        if (newState.errors && key in newState.errors) valid = false;
        validFields[key] = valid;
      });
      newState.validFields = validFields;
    }

    this.setState(newState);

    if (name === 'product' && value !== this.props.product) {
      this.props.onProductChange(value as string);
    }
  }
  handleProductChange(value: string) {
    this.handleFieldChange({} as React.FormEvent<HTMLInputElement>, 'product', value);
  }
  handleCheckChange(value: boolean) {
    this.setState({
      data: {...this.state.data, is_subscribed_to_news: value},
    });
  }

  getOrder() {
    const {lead} = this.props;
    const {CATALOG_ID_FENCE, CATALOG_ID_GATE} = constants;
    // TODO Rename item.code attribute to the correct schemaCode
    return this.props.configs.map((item) => {
      const schemaString = (calcUtils.getParams(`?${item.code}`).schema || '') as string;
      const schemaValues = schemaString.split(',');
      const schema = schemaValues.map((int) => parseInt(int, 10));
      const codeString = (calcUtils.getParams(`?${item.code}`).code || '') as string;
      const code = codeString.split(',');
      return {
        advancedEditorUrl: getAdvancedEditorUrl(
          {schema: schemaValues, code, catalog_type: item.catalog_type},
          lead?.address && lead.address.zipcode
        ),
        catalog_type: item.catalog_type,
        catalog_id: item.catalog_type === CatalogType.FENCE ? CATALOG_ID_FENCE : CATALOG_ID_GATE,
        schema,
        code,
        description: item.description,
        price: item.price,
        units: item.units,
        grade: item.grade,
      };
    });
  }

  render() {
    const {lead, mobileAddressField, product} = this.props;
    const {
      data: {email, name, phone, comment, is_subscribed_to_news: isSubscribedToNews},
      errors,
      loading,
      showNoteField,
      validFields,
    } = this.state;
    const addConfigLinkClasses = classNames({
      'add-config__disable': !lead?.address || product !== FENCE_SLUG,
    });
    return (
      <form className="Form LeadForm" data-testid="lead-form" onSubmit={this.handleSubmit.bind(this)}>
        <label className="label">Ergeon service:</label>
        <FormField>
          <RadioGroup
            name="ergeon-service"
            onChange={this.handleProductChange.bind(this)}
            selectedValue={this.props.product}
          >
            <ul className="product-radio-list no-padding">
              <RadioButton value={FENCE_SLUG}>Fences & Gates</RadioButton>
            </ul>
          </RadioGroup>
        </FormField>
        {mobileAddressField && mobileAddressField}
        <FormField>
          <Input
            isDisabled={loading}
            isValid={validFields?.name !== undefined ? validFields?.name : null}
            label="Your name"
            name="name"
            onChange={this.handleFieldChange.bind(this)}
            placeholder="e.g. John Smith"
            validationMessage={errors?.name}
            value={name}
          />
        </FormField>
        <FormField>
          <PhoneInput
            isDisabled={loading}
            isValid={validFields?.phone !== undefined ? validFields?.phone : null}
            label="Your phone number"
            name="phone"
            onChange={this.handleFieldChange.bind(this)}
            validationMessage={errors?.phone}
            value={phone}
          />
        </FormField>
        <FormField>
          <Input
            isDisabled={loading}
            isValid={validFields?.email !== undefined ? validFields?.email : null}
            label="Email"
            name="email"
            onChange={this.handleFieldChange.bind(this)}
            placeholder="e.g. username@mail.com"
            type="email"
            validationMessage={errors?.email}
            value={email}
          />
        </FormField>
        <div className="Form-action-links">
          <AddNote
            comment={comment}
            errors={errors}
            handleAddNote={this.handleAddNote.bind(this)}
            handleFieldChange={this.handleFieldChange.bind(this)}
            handleRemoveNote={this.handleRemoveNote.bind(this)}
            loading={loading}
            showNoteField={showNoteField}
          />
          <div className={addConfigLinkClasses}>
            <a className="action-link" data-testid="design-fence-gate-btn" onClick={this.handleAddConfig}>
              Design your Fence or Gate
            </a>
            <label className="label">And get an estimate instantly</label>
          </div>
        </div>
        <div className="Form-actions">
          {errors && <div className="Form-error">{errors.global}</div>}
          <Button
            className={classNames('AddressButton', 'spacing after__is-24', {'is-loading': loading})}
            disabled={loading}
            size="large"
            type="submit"
          >
            {loading ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Get a quote'}
          </Button>
          <div className="newsletter-checkbox">
            <Checkbox checked={isSubscribedToNews} onClick={this.handleCheckChange.bind(this)}>
              <p className="label">Email me interesting insights and company news</p>
            </Checkbox>
          </div>
        </div>
      </form>
    );
  }
}