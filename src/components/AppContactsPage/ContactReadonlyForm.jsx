import React from 'react';
import PropTypes from 'prop-types';

import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import DataRow from 'components/common/DataRow';

import './index.scss';

export default class ContactReadonlyForm extends React.Component {
  static propTypes = {
    contacts: PropTypes.array,
  };

  static contextType = CustomerGIDContext;

  getAdditional(contact, type) {
    const additionalInfos = (contact && contact[type]) || [];
    return additionalInfos.map((info) => info['formatted_identifier']);
  }

  renderAdditionalIdentifiers(title, idenitifiers) {
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
  }

  render() {
    const {contacts} = this.props;

    const primaryContact = contacts && contacts.find((contact) => contact['is_primary']);
    const primaryEmailInfo = primaryContact && primaryContact['primary_email'];
    const primaryPhoneInfo = primaryContact && primaryContact['primary_phone'];

    const additionalEmails = this.getAdditional(primaryContact, 'additional_emails');
    const additionalPhones = this.getAdditional(primaryContact, 'additional_phones');

    const additionalIdentifiers =
      additionalEmails.length || additionalPhones.length ? (
        <React.Fragment>
          {additionalEmails.length > 0 ? this.renderAdditionalIdentifiers('Emails', additionalEmails) : null}
          {additionalPhones.length > 0 ? this.renderAdditionalIdentifiers('Phones', additionalPhones) : null}
        </React.Fragment>
      ) : null;

    return (
      <React.Fragment>
        <DataRow title="Full Name" value={primaryContact && primaryContact['full_name']} />
        <DataRow title="Email" value={primaryEmailInfo && primaryEmailInfo['formatted_identifier']} />
        <DataRow title="Phone" value={primaryPhoneInfo && primaryPhoneInfo['formatted_identifier']} />
        {additionalIdentifiers && <DataRow title="Additional Contacts" value={additionalIdentifiers} />}
      </React.Fragment>
    );
  }
}
