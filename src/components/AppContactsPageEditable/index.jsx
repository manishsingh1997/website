import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Notification} from '@ergeon/core-components';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import AppPage from 'components/common/AppPage';
import ContactEditForm from './ContactEditForm';
import ContactReadonlyForm from './ContactReadonlyForm';
import {updateCustomerContacts} from '../../api/app';

import './index.scss';

export default function AppContactsPage({contacts, getContacts, updateContacts, updateUser, listError, isListLoading}) {
  const customerGID = useContext(CustomerGIDContext);

  const [editing, setEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [primaryContact, setPrimaryContact] = useState({
    name: undefined,
    email: undefined,
    phone: undefined,
  });
  const [additionalContacts, setAdditionalContacts] = useState([]);

  const getField = (contact, field, defaultValue) => {
    const value = (contact && contact[field]) || defaultValue;
    return value;
  };

  // will set initial user state, used by cancel button and in initial load state
  const resetUser = (userContacts = contacts) => {
    const primaryContact = userContacts && userContacts.find((contact => contact['is_primary']));
    const primaryEmailInfo = getField(primaryContact, 'primary_email');
    const primaryPhoneInfo = getField(primaryContact, 'primary_phone');

    setPrimaryContact({
      id: getField(primaryContact, 'id'),
      name: getField(primaryContact, 'full_name'),
      email: getField(primaryEmailInfo, 'formatted_identifier'),
      phone: getField(primaryPhoneInfo, 'formatted_identifier'),
    });

    const additionalEmails = getField(primaryContact, 'additional_emails') || [];
    const additionalPhones = getField(primaryContact, 'additional_phones') || [];
    setAdditionalContacts([...additionalEmails, ...additionalPhones]);
  };

  useEffect(() => {
    resetUser();
  }, [contacts]);

  const fetchData = () => {
    getContacts(customerGID);
  };

  const onEditingClick = () => {
    resetUser();
    setIsSuccess(false);
    setErrors({});
    setEditing(!editing);
  };

  const onPrimaryChange = (event, name, value) => {
    setPrimaryContact({
      ...primaryContact,
      [name]: value,
    });
  };

  const onContactInfoChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const {value} = event.target;
    const pk = parseInt(event.target.getAttribute('pk'), 10);
    const newData = [...additionalContacts];
    const index = additionalContacts.findIndex((item) => item.id === pk);

    newData[index] = {
      ...newData[index],
      'formatted_identifier': value,
      identifier: value,
    };

    setAdditionalContacts(newData);
  };

  const onSave = async(event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setErrors({});

    try {
      const cleanedContacts = additionalContacts.map((contact) => {
        if (contact.action === 'add') {
          const {identifier, type} = contact;
          return {
            identifier,
            type,
          };
        }
        return contact;
      });
      const response = await updateCustomerContacts(
        customerGID,
        {
          'id': primaryContact.id,
          'full_name': primaryContact.name,
          'phone_number': primaryContact.phone,
          'additional_contacts': cleanedContacts,
        }
      );

      updateContacts(response.data);
      await updateUser({
        'phone_number': primaryContact.phone,
        'full_name': primaryContact.name,
      });
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      parseError(error.response);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onAddNewContactInfo = (type) => {
    const addedIds = additionalContacts.filter(({action}) => action === 'add').map(({id}) => id);
    const nextId = addedIds.length === 0 ? 1 : Math.max(...addedIds) + 1;

    const contactInfo = {
      id: nextId,
      action: 'add',
      type: type.toLowerCase(),
    };

    setAdditionalContacts([
      ...additionalContacts,
      contactInfo,
    ]);
  };

  const onRemoveContactInfo = (id) => {
    const contacts = additionalContacts.filter((contact) => contact.id !== id);
    setAdditionalContacts(contacts);
  };

  const parseError = (response) => {
    if (!response) {
      return setErrors({
        global: 'Unexpected error happened. Please try again.',
      });
    }
    const {status, statusText, data} = response;

    const isValidationError = status === 400 && typeof data === 'object';

    if (isValidationError) {
      const newErrors = {};
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
      setAdditionalContacts(newAdditionalContacts);

      return;
    }

    setErrors({
      global: `Unexpected error happened: ${status} ${statusText}. Please try again.`,
    });
  };

  const renderError = () => {
    const globalError = errors.global;
    if (globalError) {
      return (
        <Notification mode="embed" type="Error">
          {globalError}
        </Notification>
      );
    }
    return null;
  };

  const renderSuccess = () => {
    if (isSuccess) {
      return (
        <Notification mode="embed" type="Success">
          Contacts were updated successfully.
        </Notification>
      );
    }
    return null;
  };

  const renderHeader = () => {
    return (
      <>
        <h5>Contacts</h5>
        {editing ? (
          <Button flavor="regular" onClick={onEditingClick}>Cancel</Button>)
          : (<Button onClick={onEditingClick}>Edit</Button>)}
      </>);
  };

  const renderContent = () => {
    if (editing) {
      return (
        <>
          {renderSuccess()}
          {renderError()}
          <ContactEditForm
            additionalContacts={additionalContacts}
            errors={errors}
            isSubmitting={isSubmitting}
            onAddNewContactInfo={onAddNewContactInfo}
            onCancel={onEditingClick}
            onContactInfoChange={onContactInfoChange}
            onPrimaryChange={onPrimaryChange}
            onRemoveContactInfo={onRemoveContactInfo}
            onSave={onSave}
            primaryContact={primaryContact}/>
        </>
      );
    }
    return (
      <ContactReadonlyForm contacts={contacts}></ContactReadonlyForm>
    );
  };

  return (
    <AppPage
      className="contacts-page"
      error={listError}
      fetchData={fetchData}
      isLoading={isListLoading}
      renderContent={renderContent}
      renderHeader={renderHeader} />
  );
}

AppContactsPage.propTypes = {
  contacts: PropTypes.array,
  getContacts: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  isListLoading: PropTypes.bool.isRequired,
  listError: PropTypes.object,
  updateContacts: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};
