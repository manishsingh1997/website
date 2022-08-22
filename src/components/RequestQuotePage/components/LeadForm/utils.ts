// @ts-ignore
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';

import {createValidator, email, phone, required} from '../../../../utils/validation';
import {Address} from '../../types';

import {LeadFormData, LeadFormProps} from './types';

export const stringifyAddress = (address?: Address | null) => {
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

export const getInitialFormData = (props: LeadFormProps): LeadFormData => ({
  email: props.user?.email || '',
  name: props.user?.full_name || '',
  phone: props.user?.phone_number || '',
  comment: '',
  product: FENCE_SLUG,
  string_address: stringifyAddress(props.lead?.address),
  is_subscribed_to_news: true,
});

const validateField = {
  email: [required, email],
  phone: [required, phone],
  product: [required],
  name: [required],
};

export const validator = createValidator(validateField);
