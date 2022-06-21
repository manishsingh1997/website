import React, {ChangeEvent, FormEvent} from 'react';

import {Button, Input, PhoneInput, Spinner} from '@ergeon/core-components';

import DataRow from '../common/DataRow';
import AdditionalContactInfo from './AdditionalContactInfo';
import {Contact, InitialContact} from './types';

type ContactEditFormProps = {
  primaryContact: InitialContact;
  isSubmitting: boolean;
  additionalContacts: Contact['additional_phones'];
  onPrimaryChange(event: Event, name: string, value: string): void;
  onAddNewContactInfo(type: string): void;
  onContactInfoChange(e: ChangeEvent<HTMLInputElement>, name: string, value: string): void;
  onRemoveContactInfo(id: number): void;
  onCancel(): void;
  onSave(event: FormEvent): Promise<void>;
  errors: {
    fullName?: string;
    phoneNumber?: string;
  };
};

const ContactEditForm = (props: ContactEditFormProps) => {
  const {
    primaryContact,
    isSubmitting,
    additionalContacts,
    onPrimaryChange,
    onAddNewContactInfo,
    onContactInfoChange,
    onRemoveContactInfo,
    onCancel,
    onSave,
    errors = {},
  } = props;

  const additionalEmails = additionalContacts.filter((item) => item.type === 'email');
  const additionalPhones = additionalContacts.filter((item) => item.type === 'phone');

  return (
    <form onSubmit={onSave}>
      <DataRow
        title="Full Name"
        value={
          <Input
            isValid={!errors.fullName}
            label="Your name"
            name="name"
            onChange={onPrimaryChange}
            validationMessage={errors.fullName}
            value={primaryContact.name}
          />
        }
      />
      <DataRow
        title="Email"
        value={
          <Input
            className="full-width-block"
            disabled
            label="Email"
            name="email"
            onChange={onPrimaryChange}
            value={primaryContact.email}
          />
        }
      />
      <DataRow
        title="Phone"
        value={
          <PhoneInput
            isValid={!errors.phoneNumber}
            label="Phone"
            name="phone"
            onChange={onPrimaryChange}
            validationMessage={errors.phoneNumber}
            value={primaryContact.phone}
          />
        }
      />
      <div className="additional-contacts">
        <h6 className="flex-row align-center additional-contacts-sub-header">Additional contacts</h6>
        <AdditionalContactInfo
          contactInfos={additionalEmails}
          label="Email"
          onAdd={onAddNewContactInfo}
          onChange={onContactInfoChange}
          onRemove={onRemoveContactInfo}
          title="Emails"
        />
        <AdditionalContactInfo
          contactInfos={additionalPhones}
          label="Phone"
          onAdd={onAddNewContactInfo}
          onChange={onContactInfoChange}
          onRemove={onRemoveContactInfo}
          title="Phones"
        />
      </div>
      <div className="contacts-page-additional-buttons">
        <Button disabled={isSubmitting} flavor="regular" onClick={onCancel} taste="solid" type="button">
          Cancel
        </Button>
        <Button disabled={isSubmitting} flavor="primary" taste="solid" type="button">
          <Spinner active={isSubmitting} size={16} />
          Save
        </Button>
      </div>
    </form>
  );
};

export default ContactEditForm;
