import React from 'react';
import PropTypes from 'prop-types';
import {Portal} from 'react-portal';
import {get} from 'lodash';

import {AddressInput, Button} from '@ergeon/core-components';
import {constants} from '@ergeon/3d-lib';
import {getCheckedZIP} from 'api/lead';
import {trackAddressEntered} from 'utils/analytics';

import './AddressUpdatePopup.scss';

class AddressUpdatePopup extends React.Component {

  static propTypes = {
    closeAddressUpdatePopup: PropTypes.func.isRequired,
    lead: PropTypes.object,
    onChange: PropTypes.func,
    open: PropTypes.bool,
    product: PropTypes.string,
    updateLead: PropTypes.func.isRequired,
    updateModalLead: PropTypes.func.isRequired,
    updateModalValue: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  state = {
    loading: false,
  };

  handleAddressSelected(lead) {
    const zipcode = get(lead, `productAvailability.products[${lead.product_slug}]`) ?
      lead.address.zipcode :
      constants.DEFAULT_ZIP;

    this.props.updateModalLead({
      ...lead,
      zipcode,
    });
  }

  handleAddressChange(value) {
    this.props.updateModalValue(value);
  }

  handleAddressSubmit() {
    const {lead} = this.props;
    if (!lead) return;
    trackAddressEntered(lead);
    this.props.updateLead(lead);
  }

  handleClose() {
    this.props.closeAddressUpdatePopup();
  }

  render() {
    const {open, lead, product, value} = this.props;
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
              onChange={this.handleAddressChange.bind(this)}
              onLoadEnds={() => this.setState({loading: false})}
              onLoadStarts={(place) => {
                this.setState({loading: true});
                this.handleAddressChange(place['formated_address']);
              }}
              onSubmit={this.handleAddressSelected.bind(this)}
              product={product}
              value={value}/>
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

export default AddressUpdatePopup;
