import React, {useCallback, useMemo, useState} from 'react';

import classNames from 'classnames';
import * as Sentry from '@sentry/browser';
import {constants, calcUtils, CatalogType} from '@ergeon/3d-lib';
import {RadioGroup} from 'react-radio-group';
import {Button, Checkbox, FormField, PhoneInput, Spinner, Input, RadioButton} from '@ergeon/core-components';
import {UPCOMING_FEATURES_PARAM} from '@ergeon/erg-utils-js';
// @ts-ignore
import {getBaseEventData} from '@ergeon/erg-utms';
// @ts-ignore
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';

import {submitLeadArrived} from '../../../../api/lead';
import {identify, track, trackError, trackTawkLeadEvent} from '../../../../utils/analytics';
import {CUSTOMER_LEAD_CREATED} from '../../../../utils/events';
import {DEFAULT_SOURCE_VALUE, GRASS_PRODUCT, LEAD_FULL_NAME_MAX_LENGTH} from '../../../../website/constants';
import {parseError, showUpcomingFeatures, getAdvancedEditorUrl} from '../../../../utils/utils';
import AddNote from '../AddNote';
import {Address} from '../../types';

import {LeadFormData, LeadFormProps} from './types';
import {getInitialFormData, stringifyAddress, validator} from './utils';
import './LeadForm.scss';

const LeadForm = (props: LeadFormProps) => {
  const {lead, mobileAddressField, user, onSubmit, product, onAddConfigClick, onProductChange, configs} = props;

  const [showNoteField, setShowNoteField] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validFields, setValidFields] = useState<Record<string, boolean> | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>> | null>(null);
  const [formData, setFormData] = useState<LeadFormData>(getInitialFormData(props));

  const resetState = useCallback(() => {
    setFormData(getInitialFormData(props));
    setShowNoteField(false);
    setValidateOnChange(false);
    setValidFields(null);
    setErrors(null);
    setIsLoading(false);
  }, [props]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = {
        ...formData,
        product,
      };
      const newErrors = validator(data);
      const newValidFields: Record<string, boolean> = {};
      Object.keys(data).forEach((key) => {
        newValidFields[key] = !(newErrors && key in newErrors);
      });
      if (newErrors) {
        setErrors(newErrors);
        setValidFields(newValidFields);
        setValidateOnChange(true);
      } else {
        setIsLoading(true);
        setValidFields(newValidFields);
        setErrors(null);
        const baseEventData = await getBaseEventData();
        const eventData = {
          ...baseEventData,
          ...data,
          address: data.address || lead?.address,
        };
        const order = getOrder();
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
          identify(data);
          track(CUSTOMER_LEAD_CREATED, {...eventData, source: DEFAULT_SOURCE_VALUE});
        } catch (error) {
          trackError(new Error('Lead submit error'), {error});
          setErrors({
            global: parseError(error) || 'Unknown error',
          });
          setIsLoading(false);
        }

        resetState();
        onSubmit && onSubmit();
      }
    },
    [formData, resetState, lead, product]
  );

  const handleRemoveNote = useCallback(() => {
    setShowNoteField(false);
    setFormData({...formData, comment: ''});
  }, [formData]);

  const handleFieldChange = useCallback(
    (_event: React.FormEvent<HTMLInputElement>, name: string, value: string | Address) => {
      const newFormData = {
        ...formData,
        string_address: stringifyAddress(name === 'address' ? (value as Address) : lead?.address),
        [name]: value,
      };

      if (validateOnChange) {
        const newErrors = validator(newFormData);
        const newValidFields: Record<string, boolean> = {};
        Object.keys(newFormData).forEach((key) => {
          let valid = true;
          if (newErrors && key in newErrors) valid = false;
          newValidFields[key] = valid;
        });
        setValidFields(newValidFields);
        setErrors(newErrors);
      }
      setFormData(newFormData);
      if (name === 'product' && value !== product) {
        onProductChange(value as string);
      }
    },
    [formData, validateOnChange, product, lead]
  );

  const handleProductChange = (value: string) => {
    handleFieldChange({} as React.FormEvent<HTMLInputElement>, 'product', value);
  }

  const handleCheckChange = useCallback(
    (value: boolean) => {
      setFormData(prevState => ({...prevState, is_subscribed_to_news: value}));
    },
    []
  );

  const getOrder = useCallback(() => {
    const {CATALOG_ID_FENCE, CATALOG_ID_GATE} = constants;
    // TODO Rename item.code attribute to the correct schemaCode
    return configs.map((item) => {
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
  }, [configs, lead]);

  const addConfigLinkClasses = useMemo(
    () =>
      classNames({
        'add-config__disable': !lead?.address || product !== FENCE_SLUG,
      }),
    [lead, product]
  );

  return (
    <form className="Form LeadForm" data-testid="lead-form" onSubmit={handleSubmit}>
      {mobileAddressField && mobileAddressField}
      <label className="label">Ergeon service:</label>
      <FormField>
        <RadioGroup
          name="ergeon-service"
          onChange={handleProductChange}
          selectedValue={product}
        >
          <ul className="product-radio-list no-padding">
            <RadioButton value={FENCE_SLUG}>Fences Installation</RadioButton>
            <RadioButton value={GRASS_PRODUCT}>Artificial Grass</RadioButton>
          </ul>
        </RadioGroup>
      </FormField>
      <FormField>
        <Input
          isDisabled={isLoading}
          isValid={validFields?.name !== undefined ? validFields?.name : null}
          label="Your name"
          maxLength={LEAD_FULL_NAME_MAX_LENGTH}
          name="name"
          onChange={handleFieldChange}
          placeholder="e.g. John Smith"
          validationMessage={errors?.name}
          value={formData.name}
        />
      </FormField>
      <FormField>
        <PhoneInput
          isDisabled={isLoading}
          isValid={validFields?.phone !== undefined ? validFields?.phone : null}
          label="Your phone number"
          name="phone"
          onChange={handleFieldChange}
          validationMessage={errors?.phone}
          value={formData.phone}
        />
      </FormField>
      <FormField>
        <Input
          isDisabled={isLoading}
          isValid={validFields?.email !== undefined ? validFields?.email : null}
          label="Email"
          name="email"
          onChange={handleFieldChange}
          placeholder="e.g. username@mail.com"
          type="email"
          validationMessage={errors?.email}
          value={formData.email}
        />
      </FormField>
      <div className="Form-action-links">
        <AddNote
          comment={formData.comment}
          errors={errors}
          handleAddNote={() => setShowNoteField(true)}
          handleFieldChange={handleFieldChange}
          handleRemoveNote={handleRemoveNote}
          loading={isLoading}
          showNoteField={showNoteField}
        />
        <div className={addConfigLinkClasses}>
          <a className="action-link" data-testid="design-fence-gate-btn" onClick={onAddConfigClick}>
            Design your Fence or Gate
          </a>
          <label className="label">And get an estimate instantly</label>
        </div>
      </div>
      <div className="Form-actions">
        {errors && <div className="Form-error">{errors.global}</div>}
        <Button
          className={classNames('AddressButton', 'spacing after__is-24', {'is-loading': isLoading})}
          disabled={isLoading}
          size="large"
          type="submit"
        >
          {isLoading ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Get a quote'}
        </Button>
        <div className="newsletter-checkbox">
          <Checkbox checked={formData.is_subscribed_to_news} onClick={handleCheckChange}>
            <p className="label">Email me interesting insights and company news</p>
          </Checkbox>
        </div>
      </div>
    </form>
  );
};

export default LeadForm;
