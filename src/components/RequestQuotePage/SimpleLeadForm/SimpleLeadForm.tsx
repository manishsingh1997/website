import React, { ChangeEvent, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import classNames from 'classnames';
import * as Sentry from '@sentry/browser';
import { CatalogType } from '@ergeon/3d-lib';
import { Button, FormField, Spinner, Input, useGooglePlacesAutocomplete, utils } from '@ergeon/core-components';
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
import { Address, stringifyAddress } from '../utils';
import { getOrder, isMinimumValidAddress } from './utils';
import { Config, User } from './types';

import './SimpleLeadForm.scss';

const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
// eslint-disable-next-line max-len
const EMAIL_REGEX =
  /^[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;

const MAX_CHARACTERS_PHONE_EMAIL = 256; // max allowed for email, regex checks will complain for phone

type SimpleLeadFormProps = {
  configs: Config[];
  lead: {
    address?: Address;
  };
  onProductChange: (product: CatalogType) => void;
  onSubmit: (lead?: Record<string, unknown>) => void;
  product: string;
  user: User;
};

/** 
 * SimpleLeadForm is a form that is used to submit leads
 * 
 * Notes:
 * lead.address is defined and saved if previously used, otherwise it is undefined
 * 
 * Please be really careful on what we send to BE. 
 * Inconsistent data can significantly decrease leads conversion and drop sales.
 * We strictly need to send the following fields to avoid incomplete leads addresses:
 * address {Address}
 * raw_address {string}
 */
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
    };
  }, []);

  const { control, handleSubmit, setValue, setError, clearErrors } = useForm({
    defaultValues: {
      address: address || {}, // check if we have lead.address already
      name: user?.full_name || '',
      phone: user?.phone_number || '',
      email: user?.email || '',
      phoneEmail: '',
      comment: '',
      product: selectedProduct,
      raw_address: stringifyAddress(address) || '',
      is_subscribed_to_news: true,
    },
  });

  const triggerAddressError = useCallback(() => {
    setError('raw_address', {
      type: 'value',
      message: 'Please enter at least your city and then select from the list',
    });
  }, [setError]);

  const submit = useCallback(
    async (fieldsData) => {
      // let's make sure we have a valid address otherwise lets not submit and show an error
      // also let's check user has same raw_address as he might change it, so it has to match
      if (!isMinimumValidAddress(fieldsData.address) || fieldsData.raw_address !== fieldsData.address.raw_address) {
        triggerAddressError();
        return;
      }
      setLoading(true);
      const newData = {
        ...fieldsData,
        product: fieldsData.product.value,
        phone: utils.formatPhoneNumber(fieldsData.phone) || '',
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
      } finally {
        setLoading(false);
      }
      onSubmit && onSubmit(newData);
    },
    [product, onSubmit, user, address, lead, configs, triggerAddressError],
  );

  const handlePhoneEmailField = useCallback(
    (e: ChangeEvent<HTMLInputElement>, onChange) => {
      const value = e.target.value;
      if (EMAIL_REGEX.test(value)) {
        setValue('email', value);
      }
      if (PHONE_REGEX.test(value)) {
        setValue('phone', value);
      }
      onChange(value);
    },
    [setValue]
  );

  const isFieldValid = useCallback((fieldState) => {
    if (fieldState.error) {
      return false;
    }
    if (fieldState.isDirty) {
      return true;
    }
    return null;
  }, []);

  // let's track placeData (from google places dropdown) to verify we have a valid address
  useEffect(
    function setAddressData() {
      if (placeData) {
        if (isMinimumValidAddress(placeData)) {
          clearErrors('raw_address');
          setValue('address', placeData); // assign to our address object
          setValue('raw_address', placeData.formatted_address);
          return;
        }
        triggerAddressError();
      }
    },
    [placeData, setError, setValue, triggerAddressError, clearErrors]
  );

  return (
    <form className="SimpleForm LeadForm" onSubmit={handleSubmit(submit)}>
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
              value={field.value}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter your name',
            },
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
              value={field.value}
            />
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
              value: MAX_CHARACTERS_PHONE_EMAIL,
              message: 'Please enter a valid phone or email',
            },
          }}
        />
      </FormField>
      <FormField>
        <Controller
          control={control}
          name="raw_address"
          render={({ field, fieldState }) => (
            <Input
              isDisabled={loading}
              isValid={isFieldValid(fieldState)}
              label="Address"
              name="raw_address"
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
            },
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
              label="Message (Optional)"
              name="comment"
              onChange={field.onChange}
              type="textarea"
              validationMessage={fieldState.error?.message}
              value={field.value}
            />
          )}
        />
      </FormField>
      <div className="SimpleForm-actions">
        <Button
          className={classNames('AddressButton', 'spacing after__is-24', { 'is-loading': loading })}
          disabled={loading}
          flavor="primary"
          size="large"
        >
          {loading ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default SimpleLeadForm;
