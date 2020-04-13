import React from 'react';
import PropTypes from 'prop-types';

import {AddressInput} from '@ergeon/core-components';

import {getCheckedZIP} from 'api/lead';
import {trackAddressEntered} from 'utils/analytics';
import {history} from 'index';

class AddressForm extends React.Component {
  static propTypes = {
    product: PropTypes.string,
    updateLead: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      lead: null,
    };
  }

  handleAddressSubmit(lead) {
    trackAddressEntered(lead);
    this.props.updateLead(lead);
    history.push('/request-quote');
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

export default AddressForm;
