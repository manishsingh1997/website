import React, {useCallback, useMemo} from 'react';

import DataRow from '../common/DataRow';
import {Contact} from './types';

import './index.scss';

type ContactReadonlyFormProps = {
  contacts: Contact[];
};

const ContactReadonlyForm = (props: ContactReadonlyFormProps) => {
  const {contacts} = props;

  const getAdditional = (contact: Contact, type: 'additional_emails' | 'additional_phones') => {
    const additionalInfos = contact?.[type];
    return additionalInfos.map((info) => info['formatted_identifier']);
  };

  const renderAdditionalIdentifiers = useCallback((title: string, idenitifiers: string[]) => {
    return (
      <div className="additional-identifiers">
        <div>{title}:</div>
        <div className="identifiers-list">
          {idenitifiers.map((idenitifier, cnt) => (
            <span key={cnt}>
              {idenitifier}
              {cnt + 1 < idenitifiers.length && ', '}
            </span>
          ))}
        </div>
      </div>
    );
  }, []);

  const contactDetails = useMemo(() => {
    const primaryContact = contacts.find((contact) => contact['is_primary']);
    const primaryEmailInfo = primaryContact?.['primary_email'];
    const primaryPhoneInfo = primaryContact?.['primary_phone'];

    return {primaryContact, primaryEmailInfo, primaryPhoneInfo};
  }, [contacts]);

  const additionalIdentifiers = useMemo(() => {
    if (!contactDetails['primaryContact']) return null;

    const additionalEmails = getAdditional(contactDetails['primaryContact'], 'additional_emails');
    const additionalPhones = getAdditional(contactDetails['primaryContact'], 'additional_phones');

    if (additionalEmails.length || additionalPhones.length) {
      return (
        <>
          {additionalEmails.length > 0 && renderAdditionalIdentifiers('Emails', additionalEmails)}
          {additionalPhones.length > 0 && renderAdditionalIdentifiers('Phones', additionalPhones)}
        </>
      );
    }
    return null;
  }, [contactDetails]);

  return (
    <>
      <DataRow title="Full Name" value={contactDetails['primaryContact']?.['full_name']} />
      <DataRow title="Email" value={contactDetails['primaryEmailInfo']?.['formatted_identifier']} />
      <DataRow title="Phone" value={contactDetails['primaryPhoneInfo']?.['formatted_identifier']} />
      <DataRow title="Additional Contacts" value={additionalIdentifiers} />
    </>
  );
};

export default ContactReadonlyForm;
