import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {AddressInput} from '@ergeon/core-components';

import {getCheckedZIP} from 'api/lead';
import {trackAddressEntered} from 'utils/analytics';

class AddressForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    onChange: PropTypes.func,
    product: PropTypes.string,
    updateLead: PropTypes.func,
    value: PropTypes.string,
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

  handleOnchange(leadValue) {
    if (this.props.onChange) {
      this.props.onChange(leadValue);
    }
    this.setState({lead: null});
  }

  render() {
    const {product, value} = this.props;

    return (
      <div>
        <AddressInput
          getCheckedZIP={getCheckedZIP}
          onChange={this.handleOnchange.bind(this)}
          onSubmit={this.handleAddressSubmit.bind(this)}
          product={product}
          showButton
          value={value}
        />
      </div>
    );
  }
}

export default withRouter(AddressForm);
