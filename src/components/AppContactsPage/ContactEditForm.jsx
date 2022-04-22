import React from 'react';
import PropTypes from 'prop-types';
import {Button, Input, PhoneInput, Spinner} from '@ergeon/core-components';
import AdditionalContactInfo from './AdditionalContactInfo';

import DataRow from 'components/common/DataRow';

const ContactEditForm = (props) => {
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
        type="email"
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

ContactEditForm.propTypes = {
  additionalContacts: PropTypes.array,
  errors: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onAddNewContactInfo: PropTypes.func,
  onCancel: PropTypes.func,
  onContactInfoChange: PropTypes.func,
  onPrimaryChange: PropTypes.func,
  onRemoveContactInfo: PropTypes.func,
  onSave: PropTypes.func,
  primaryContact: PropTypes.object,
};

export default ContactEditForm;
