import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {AddressInput} from '@ergeon/core-components';

import {getCheckedZIP} from 'libs/api';
import {trackAddressEntered} from 'libs/utils/analytics';
import {actionTriggers} from 'actions/address-actions';
import {history} from 'index';

class AddressForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    product: PropTypes.string,
    showProductField: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      showLeadForm: false,
      lead: null,
    };
  }

  handleAddressSubmit(lead) {
    trackAddressEntered(lead);
    this.props.dispatch(actionTriggers.updateAddress(lead));
    history.push('/request-quote');
  }

  handleCloseLeadForm(success) {
    const newState = {
      showLeadForm: false,
    };
    if (success) {
      newState.lead = null;
      newState.value = '';
      newState.error = '';
    }
    this.setState(newState);
  }

  render() {
    const {product} = this.props;

    return (
      <div>
        <AddressInput
          getCheckedZIP={getCheckedZIP}
          onChange={() => this.setState({lead: null})}
          onSubmit={this.handleAddressSubmit.bind(this)}
          product={product}
          showButton />
      </div>
    );
  }
}

export default connect(() => ({}))(AddressForm);