import React from 'react';
import PropTypes from 'prop-types';

import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import withDataLoader from 'components/common/withDataLoader';

import './index.scss';

const withDataLoaderWrapper = withDataLoader({
  fetchData: (props, context) => {
    const {contacts, getContacts} = props;
    const customerGID = context;
    if (!contacts) {
      getContacts(customerGID);
    }
  },
  isLoading: (props) => props.isListLoading,
  getError: (props) => props.listError,
  contextType: CustomerGIDContext,
});

class AppContactsPage extends React.Component {

  static propTypes = {
    contacts: PropTypes.array,
    getContacts: PropTypes.func.isRequired,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
  };

  getAdditional(contact, type) {
    const additionalInfos = (contact && contact[type]) || [];
    return additionalInfos.map(info => info['formatted_identifier']);
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
        {(additionalEmails.length || additionalPhones.length) ? (
          <div className="data-row">
            <div>Additional Contacts</div>
            <div>
              {additionalEmails && this.renderAdditionalIdentifiers('Emails', additionalEmails)}
              {additionalPhones && this.renderAdditionalIdentifiers('Phones', additionalPhones)}
            </div>
          </div>
        ): null}
      </div>
    );
  }
}

export default withDataLoaderWrapper(AppContactsPage);
