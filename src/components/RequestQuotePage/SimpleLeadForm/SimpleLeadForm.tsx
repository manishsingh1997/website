import React, { ChangeEvent, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import classNames from 'classnames';
import * as Sentry from '@sentry/browser';
import { CatalogType } from '@ergeon/3d-lib';
import { Button, FormField, Spinner, Input, useGooglePlacesAutocomplete } from '@ergeon/core-components';
import { useForm, Controller } from 'react-hook-form';
import { UPCOMING_FEATURES_PARAM } from '@ergeon/erg-utils-js';
// @ts-ignore
import { getBaseEventData } from '@ergeon/erg-utms';
// @ts-ignore
import { FENCE_SLUG } from '@ergeon/core-components/src/constants';
import { submitLeadArrived } from '../../../api/lead';
import { showUpcomingFeatures } from '../../../utils/utils';
import { identify, track, trackError, trackTawkLeadEvent } from '../../../utils/analytics';
import { CUSTOMER_LEAD_CREATED } from '../../../utils/events';
import { DEFAULT_SOURCE_VALUE } from '../../../website/constants';
import { Address, formatPhoneNumber } from '../utils';
import { getOrder, isFullAddress } from './utils';
import { Config, User } from './types';

import './SimpleLeadForm.scss';

const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
// eslint-disable-next-line max-len
const EMAIL_REGEX = /^[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/

type SimpleLeadFormProps = {
  configs: Config[],
  lead: {
    address?: Address,
  },
  onProductChange: (product: CatalogType) => void,
  onSubmit: (lead?: Record<string, unknown>) => void,
  product: string,
  user: User,
}

const SimpleLeadForm = (props: SimpleLeadFormProps) => {
  const { lead, user, onSubmit, product, configs } = props;
  const { address } = lead;

  const [loading, setLoading] = useState(false);
  const googlePlacesInputRef = useRef<HTMLInputElement>(null);
  const { placeData } = useGooglePlacesAutocomplete(googlePlacesInputRef);

  const selectedProduct = useMemo(() => {
    return {
      label: 'Fences & Gates',
      value: FENCE_SLUG,
    }
  }, []);

  const { control, handleSubmit, setValue, setError, clearErrors } = useForm({
    defaultValues: {
      address: '',
      name: user?.full_name || '',
      phone: user?.phone_number || '',
      email: user?.email || '',
      phoneEmail: '',
      comment: '',
      product: selectedProduct,
      'string_address': '',
      'is_subscribed_to_news': true,
    }
  });

  const submit = useCallback(async (fieldsData) => {
    const newData = {
      ...fieldsData,
      product: fieldsData.product.value,
      phone: formatPhoneNumber(fieldsData.phone) || '',
    };
    delete newData.phoneEmail; // remove as we have phone/email fields
    const baseEventData = await getBaseEventData();
    const eventData = {
      ...baseEventData,
      ...newData,
      address: fieldsData.address || lead.address,
    };
    const order = getOrder(configs, lead);
    if (product === FENCE_SLUG) {
      eventData['object'] = { ...eventData.object, order };
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
      identify(newData);
      track(CUSTOMER_LEAD_CREATED, { ...eventData, source: DEFAULT_SOURCE_VALUE });
    } catch (error) {
      trackError(new Error('Lead submit error'), { error });
    }
    setLoading(false);
    onSubmit && onSubmit(newData);
  }, [product, onSubmit, user, address, lead, configs]);

  const handlePhoneEmailField = useCallback((e: ChangeEvent<HTMLInputElement>, onChange) => {
    const value = e.target.value;
    if (EMAIL_REGEX.test(value)) {
      setValue('email', value);
    }
    if (PHONE_REGEX.test(value)) {
      setValue('phone', value);
    }
    onChange(value);
  }, [setValue]);

  const isFieldValid = useCallback((fieldState) => {
    if (fieldState.error) {
      return false;
    }
    if (fieldState.isDirty) {
      return true;
    }
    return null;
  }, []);

  useEffect(function setStringAddress() {
    if (placeData) {
      if (isFullAddress(placeData)) {
        clearErrors('address');
        setValue('address', placeData);
        setValue('string_address', placeData.formatted_address);
        return;
      }
      setError('address',
        { type: 'value', message: 'Enter your home address including house number and select from the list' });
    }
  }, [placeData, setError, setValue]);

  return (
    <form className="Form LeadForm" onSubmit={handleSubmit(submit)}>
      <FormField>
        <Controller
          control={control}
          defaultValue={user?.full_name ?? ''}
          name="name"
          render={({ field, fieldState }) => (
            <Input
              isDisabled={loading}
              isValid={isFieldValid(fieldState)}
              label="Name"
              name="name"
              onChange={field.onChange}
              placeholder="e.g. John Smith"
              type="text"
              validationMessage={fieldState.error?.message}
              value={field.value} />
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter your name',
            }
          }}
        />
      </FormField>
      <FormField>
        <Controller
          control={control}
          defaultValue={user?.full_name ?? ''}
          name="phoneEmail"
          render={({ field, fieldState }) => (
            <Input
              isDisabled={loading}
              isValid={isFieldValid(fieldState)}
              label="Phone or email"
              name="phoneEmail"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlePhoneEmailField(e, field.onChange)}
              placeholder=""
              type="text"
              validationMessage={fieldState.error?.message}
              value={field.value} />
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter your phone or email',
            },
            pattern: {
              value: new RegExp(`${PHONE_REGEX.source}|${EMAIL_REGEX.source}`),
              message: 'Please enter a valid phone or email',
            },
            maxLength: {
              value: 30,
              message: 'Please enter a valid phone or email',
            }
          }}
        />
      </FormField>
      <FormField>
        <Controller
          control={control}
          name="string_address"
          render={({ field, fieldState }) => (
            <Input
              isDisabled={loading}
              isValid={isFieldValid(fieldState)}
              label="Address"
              name="string_address"
              onChange={field.onChange}
              ref={googlePlacesInputRef}
              type="textarea"
              validationMessage={fieldState.error?.message}
              value={field.value}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter your address',
            }
          }}
        />
      </FormField>
      <FormField>
        <Controller
          control={control}
          name="comment"
          render={({ field, fieldState }) => (
            <Input
              className="LeadForm-Message spacing after__is-24"
              isDisabled={loading}
              isMultiline
              isValid={isFieldValid(fieldState)}
              label="Message"
              name="comment"
              onChange={field.onChange}
              type="textarea"
              validationMessage={fieldState.error?.message}
              value={field.value}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter a message',
            }
          }}
        />
      </FormField>
      <div className="Form-actions">
        <Button
          className={classNames('AddressButton', 'spacing after__is-24', { 'is-loading': loading })}
          disabled={loading}
          flavor="primary"
          size="large">
          {loading ? <Spinner active={true} borderWidth={0.10} size={25} /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default SimpleLeadForm;
