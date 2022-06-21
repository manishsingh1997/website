import {useCallback, useState} from 'react';
import {AxiosError} from 'axios';
import { AdditionalContact } from '../types';

type ErrorState = {
  phoneNumber?: string;
  fullName?: string;
  global?: string;
};

type useParseErrorsProps = {
  additionalContacts: AdditionalContact;
  updateAdditionalContacts(contact: AdditionalContact): void;
};

const useParseErrors = (props: useParseErrorsProps) => {
  const {additionalContacts, updateAdditionalContacts} = props;
  const [errors, setErrors] = useState<ErrorState>({});

  const parseError = useCallback((response: AxiosError) => {
      if (!response) {
        return setErrors({
          global: 'Unexpected error happened. Please try again.',
        });
      }
      const {status, statusText, data} = response.response || {};

      const isValidationError = status === 400 && typeof data === 'object';

      if (isValidationError) {
        const newErrors: ErrorState = {};
        const phoneNumberErrors = data['phone_number'];
        if (Array.isArray(phoneNumberErrors) && phoneNumberErrors[0]) {
          newErrors.phoneNumber = phoneNumberErrors[0];
        }

        const fullNameErrors = data['full_name'];
        if (Array.isArray(fullNameErrors) && fullNameErrors[0]) {
          newErrors.fullName = fullNameErrors[0];
        }
        setErrors(newErrors);

        const additionalContactsErrors = data['additional_contacts'];
        const newAdditionalContacts = additionalContacts.map((contact, index) => {
          const contactError = additionalContactsErrors[index];
          if (!contactError || Object.keys(contactError).length === 0) {
            delete contact.error;
            return contact;
          }
          const errorKeys = Object.keys(contactError);
          const errorMessage = typeof contactError === 'string' ? contactError : contactError[errorKeys[0]][0];
          return {
            ...contact,
            error: errorMessage,
          };
        });
        updateAdditionalContacts(newAdditionalContacts);

        return;
      }

      setErrors({
        global: `Unexpected error happened: ${status} ${statusText}. Please try again.`,
      });
    }, [updateAdditionalContacts, additionalContacts]);

  return {errors, setErrors, parseError}
};

export default useParseErrors;
