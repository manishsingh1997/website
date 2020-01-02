import React from 'react';
import PropTypes from 'prop-types';

import AppLoader from 'components/common/AppLoader';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';

import './index.scss';

class AppContactsPage extends React.Component {

  static propTypes = {
    contacts: PropTypes.array,
    getContacts: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
  };

  componentDidMount() {
    const {contacts, getContacts} = this.props;
    if (!contacts) {
      const customerGID = this.context;
      getContacts(customerGID);
    }
  }

  static contextType = CustomerGIDContext;

  getAdditional(contact, type) {
    const additionalInfos = contact && contact[type];
    return additionalInfos && additionalInfos.map(info => info['formatted_identifier']);
  }

  renderError(error) {
    console.warn(error);
    return (
      <div className="center error">
        <p>Something unexpected happened, we are already notified about this.</p>
        <p>Please try to reload the page.</p>
      </div>
    );
  }

  renderAdditionalIdentifiers(title, idenitifiers) {
    return (
      <div className="additional-identifiers">
        <div>{title}:</div>
        <div className="identifiers-list">
          {idenitifiers.map((idenitifier, cnt) => (
            <span key={cnt}>{idenitifier}{cnt + 1 < idenitifiers.length && ', '}</span>)
          )}
        </div>
      </div>
    );
  }

  render() {
    const {isListLoading, listError} = this.props;
    if (isListLoading) {
      return <AppLoader />;
    }

    if (listError) {
      return this.renderError(listError);
    }

    const {contacts} = this.props;

    const primaryContact = contacts && contacts.find((contact => contact['is_primary']));
    const primaryEmailInfo = primaryContact && primaryContact['primary_email'];
    const primaryPhoneInfo = primaryContact && primaryContact['primary_phone'];

    const additionalEmails = this.getAdditional(primaryContact, 'additional_emails');
    const additionalPhones = this.getAdditional(primaryContact, 'additional_phones');

    return (
      <div className="contacts-page">
        <h4>Contacts</h4>
        <div className="data-row">
          <div>Full Name</div>
          <div>{primaryContact && primaryContact.full_name || '-'}</div>
        </div>
        <div className="data-row">
          <div>Email</div>
          <div>{primaryEmailInfo && primaryEmailInfo['formatted_identifier'] || '-'}</div>
        </div>
        <div className="data-row">
          <div>Phone</div>
          <div>{primaryPhoneInfo && primaryPhoneInfo['formatted_identifier'] || '-'}</div>
        </div>
        {(additionalEmails || additionalPhones) && (
          <div className="data-row">
            <div>Additional Contacts</div>
            <div>
              {additionalEmails && this.renderAdditionalIdentifiers('Emails', additionalEmails)}
              {additionalPhones && this.renderAdditionalIdentifiers('Phones', additionalPhones)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AppContactsPage;
