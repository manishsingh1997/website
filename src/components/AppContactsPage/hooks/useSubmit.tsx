import {AxiosError} from 'axios';
import {useCallback, useContext, useEffect, useState} from 'react';

import {updateCustomerContacts} from '../../../api/app';
import CustomerGIDContext from '../../../context-providers/CustomerGIDContext';
import {AdditionalContact, InitialContact} from '../types';

type UseSubmitProps = {
  additionalContacts: AdditionalContact;
  initialContact: InitialContact;
  updateContacts(contacts: string[]): void;
  updateUser(data: {phone_number: string; full_name: string}): void;
  updateEdit(value: boolean): void;
  editing: boolean;
  onError(error: AxiosError): void;
};

const useSubmit = (props: UseSubmitProps) => {
  const {additionalContacts, initialContact, updateContacts, updateUser, updateEdit, editing, onError} = props;
  const customerGID = useContext<string>(CustomerGIDContext);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const cleanedContacts = additionalContacts.map((contact) => {
        if (contact.action === 'add') {
          const {identifier, type} = contact;
          return {identifier, type};
        }
        return contact;
      });

      const response = await updateCustomerContacts(customerGID, {
        id: initialContact.id,
        full_name: initialContact.name,
        phone_number: initialContact.phone,
        additional_contacts: cleanedContacts,
      });

      updateContacts(response.data);
      updateUser({
        phone_number: initialContact?.phone as string,
        full_name: initialContact?.name as string,
      });
      setSuccess(true);
      updateEdit(false);
    } catch (error) {
      setSuccess(false);
      onError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [additionalContacts]);

  useEffect( function watchEdit(){
      if (editing) {
        setSuccess(false)
      }
  }, [editing])

  return {submit, success, loading};
};

export default useSubmit;
