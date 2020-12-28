import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {AddressInput} from '@ergeon/core-components';

import {getCheckedZIP} from 'api/lead';
import {trackAddressEntered} from 'utils/analytics';

class AddressForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    product: PropTypes.string,
    updateLead: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      lead: null,
    };
  }

  async handleAddressSubmit(lead) {
    trackAddressEntered(lead);
    try {
      await this.props.updateLead(lead);
    } catch (updateLeadError) {
      console.error('Failed to dispatch LEAD_UPDATED action: ', updateLeadError);
      return;
    }
    this.props.history.push('/request-quote');
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

export default withRouter(AddressForm);
