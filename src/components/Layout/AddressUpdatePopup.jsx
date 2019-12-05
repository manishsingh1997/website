import React from 'react';
import PropTypes from 'prop-types';
import {Portal} from 'react-portal';
import {connect} from 'react-redux';

import {AddressInput, Button} from '@ergeon/core-components';
import {actionTriggers} from 'actions/address-actions';
import {getCheckedZIP} from 'libs/api';
import {trackAddressEntered} from 'libs/utils/analytics';

import './AddressUpdatePopup.scss';

class AddressUpdatePopup extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    lead: PropTypes.object,
    onChange: PropTypes.func,
    open: PropTypes.bool,
    product: PropTypes.string,
  };

  state = {
    loading: false,
  };

  handleAddressSelected(lead) {
    this.props.dispatch(actionTriggers.updateModalLead(lead));
  }

  handleAddressSubmit() {
    const {lead, dispatch} = this.props;
    if (!lead) return;
    trackAddressEntered(lead);
    dispatch(actionTriggers.updateAddress(lead));
  }

  handleClose() {
    this.props.dispatch(actionTriggers.closeAddressUpdatePopup());
  }

  render() {
    const {open, lead, product} = this.props;
    const {loading} = this.state;

    if (!open) {
      return null;
    }

    return (
      <Portal into="body">
        <div className="Popup address-update-popup">
          <div className="Popup-overlay" onClick={this.handleClose.bind(this)} />
          <div className="Popup-content">
            <h4>Update your address</h4>
            <AddressInput
              getCheckedZIP={getCheckedZIP}
              loading={loading}
              onChange={this.handleAddressSelected.bind(this, null)}
              onLoadEnds={() => this.setState({loading: false})}
              onLoadStarts={() => this.setState({loading: true})}
              onSubmit={this.handleAddressSelected.bind(this)}
              product={product}/>
            <hr className="Separator" />
            <div className="Buttons">
              <Button flavor="regular" onClick={this.handleClose.bind(this)}>Cancel</Button>
              <Button
                className="submit-button"
                disabled={(!lead || loading)}
                flavor={(!lead || loading) ? 'regular' : 'primary'}
                onClick={this.handleAddressSubmit.bind(this)}>
                Update Address
              </Button>
            </div>
            <div className="Popup-close" onClick={this.handleClose.bind(this)}>×</div>
          </div>
        </div>
      </Portal>
    );
  }
}

export default connect(state => {
  return {
    open: state.address.updateModalOpened,
    lead: state.address.updateModalLead,
  };
})(AddressUpdatePopup);
