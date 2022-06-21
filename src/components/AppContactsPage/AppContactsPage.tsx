import React, {ChangeEvent, FormEvent, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import classnames from 'classnames';

import {Button, Notification} from '@ergeon/core-components';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import AppPage from '../common/AppPage';
import ContactEditForm from './ContactEditForm';
import ContactReadonlyForm from './ContactReadonlyForm';

import './index.scss';
import {AdditionalContact, Contact, InitialContact} from './types';
import useParseErrors from './hooks/useParseErrors';
import useSubmit from './hooks/useSubmit';

type AppContactsPageProps = {
  contacts: Contact[];
  getContacts(customerGID: number): void;
  getCurrentUser(customerGID: number): void;
  isListLoading: boolean;
  listError: [] | null;
  updateContacts(contacts: string[]): void;
  updateUser(data: {phone_number: string; full_name: string}): void;
};

const AppContactsPage = (props: AppContactsPageProps) => {
  const {contacts, getContacts, updateContacts, updateUser, listError, isListLoading} = props;
  const customerGID = useContext(CustomerGIDContext);

  const [editing, setEditing] = useState(false);
  const [initialContact, setInitialContact] = useState<InitialContact>({});
  const [additionalContacts, setAdditionalContacts] = useState<AdditionalContact>([]);

  const {errors, setErrors, parseError} = useParseErrors({
    additionalContacts,
    updateAdditionalContacts: setAdditionalContacts,
  });

  const {loading: isSubmitting, submit, success: isSuccess} = useSubmit({
    additionalContacts,
    initialContact,
    onError: parseError,
    updateContacts,
    updateUser,
    updateEdit: setEditing,
    editing,
  })

  // will set initial user state, used by cancel button and in initial load state
  const resetUser = useCallback(() => {
    const primaryContact = contacts && contacts.find((contact) => contact['is_primary']);
    if (!primaryContact) return;
    const primaryEmailInfo = primaryContact?.['primary_email'];
    const primaryPhoneInfo = primaryContact?.['primary_phone'];

    setInitialContact({
      id: primaryContact?.['id'],
      name: primaryContact?.['full_name'],
      email: primaryEmailInfo?.['formatted_identifier'],
      phone: primaryPhoneInfo?.['formatted_identifier'],
    });

    const additionalEmails = primaryContact['additional_emails'] || [];
    const additionalPhones = primaryContact['additional_phones'] || [];

    setAdditionalContacts([...additionalEmails, ...additionalPhones]);
  }, [contacts]);

  const fetchData = useCallback(() => {
    getContacts(customerGID);
  }, [getContacts, customerGID]);

  const onEditingClick = useCallback(() => {
    resetUser();
    setErrors({});
    setEditing(!editing);
  }, [editing, resetUser]);

  const onPrimaryChange = useCallback((_event: Event, name: string, value: string) => {
      setInitialContact({
        ...initialContact,
        [name]: value,
      });
    }, [initialContact]);

  const onContactInfoChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const value = event.target.value;
    const pk = parseInt(event.target.getAttribute('pk') as string, 10);
    const newData = [...additionalContacts];
    const index = additionalContacts.findIndex((item) => item.id === pk);

    newData[index] = {
      ...newData[index],
      formatted_identifier: value,
      identifier: value,
    };

    setAdditionalContacts(newData);
  }, [additionalContacts]);

  const onSave = useCallback(async (event: FormEvent) => {
      event.preventDefault();
      setErrors({});
      submit();
    }, [submit]);

  const onAddNewContactInfo = useCallback((type: string) => {
    const addedIds = additionalContacts.filter(({action}) => action === 'add').map(({id}) => id);
    const nextId = addedIds.length === 0 ? 1 : Math.max(...addedIds) + 1;

    const contactInfo = [
      {
        id: nextId,
        action: 'add',
        type: type.toLowerCase(),
        formatted_identifier: ''
      },
    ] as Contact['additional_phones'];

    setAdditionalContacts([...additionalContacts, ...contactInfo]);
  }, [additionalContacts]);

  const onRemoveContactInfo = useCallback((id: number) => {
    const contacts = additionalContacts.filter((contact) => contact.id !== id);
    setAdditionalContacts(contacts);
  }, [additionalContacts]);

  const renderError = useMemo(() => {
    const globalError = errors?.global;
    if (globalError) {
      return (
        <Notification mode="embed" type="Error">
          {globalError}
        </Notification>
      );
    }
    return null;
  }, [errors]);

  const renderSuccess = useMemo(() => {
    if (isSuccess) {
      return (
        <Notification mode="embed" type="Success">
          Contacts were updated successfully.
        </Notification>
      );
    }
    return null;
  }, [isSuccess]);

  const renderHeader = useMemo(() => {
    if (editing) {
      return (
        <>
          Contacts{' '}
          <Button flavor="regular" onClick={onEditingClick} size="small">
            Cancel
          </Button>
        </>
      );
    }
    return (
      <>
        Contacts{' '}
        <Button onClick={onEditingClick} size="small">
          Edit
        </Button>
      </>
    );
  }, [editing, onEditingClick]);

  const renderContent = useMemo(() => {
    if (editing) {
      return (
        <>
          {renderError}
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
            primaryContact={initialContact}
          />
        </>
      );
    }
    return (
      <>
        {renderSuccess}
        <ContactReadonlyForm contacts={contacts}></ContactReadonlyForm>
      </>
    );
  }, [
    additionalContacts,
    contacts,
    editing,
    errors,
    initialContact,
    isSubmitting,
    onAddNewContactInfo,
    onPrimaryChange,
    onRemoveContactInfo,
    onSave,
    renderError,
    renderSuccess,
  ]);

  const content = useCallback(() => {
    return renderContent;
  }, [renderContent])

  const header = useCallback(() => {
    return renderHeader;
  }, [renderHeader])

  const classes = useMemo(() => {
    return classnames('contacts-page', {
      'contacts-page_edit_form': editing
    })
  }, [editing]);

  useEffect(() => {
    resetUser();
  }, [resetUser]);

  return (
    <AppPage
      className={classes}
      error={listError}
      fetchData={fetchData}
      isLoading={isListLoading}
      renderContent={content}
      renderHeader={header}
    />
  );
};

export default AppContactsPage;
