import React from 'react';
import PropTypes from 'prop-types';
import Raven from 'raven-js';
import {UAParser} from 'ua-parser-js';

import {getUTM, getUserUuid, track} from 'libs/utils/analytics';
import {ADDRESS_ENTERED} from 'libs/utils/events';
import {DEFAULT_SOURCE_VALUE} from 'libs/constants';
import {submitAddressEntered, getCheckedZIP} from 'libs/api';

import {AddressInput} from '@ergeon/core-components';
import LeadForm from './lead-form';

export default class AddressForm extends React.Component {
  static propTypes = {
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

  showModal(lead) {
    this.setState({
      lead,
      showLeadForm: true,
    });
  }

  trackAddressEntered(lead) {
    const {...utms} = getUTM();

    const data = {
      address: lead.address,
      'product_slug': lead['product_slug'],
    };

    track(ADDRESS_ENTERED, {
      ...utms,
      address: data.address,
      source: DEFAULT_SOURCE_VALUE,
    });

    const address = data.address;
    const enteredAddressData = {};
    enteredAddressData['uuid'] = getUserUuid();
    enteredAddressData['formatted_address'] = address.formatted_address;
    enteredAddressData['place_types'] = address.place_types;
    enteredAddressData['raw_address'] = address.raw_address;
    enteredAddressData['zip_code'] = address.zipcode;
    enteredAddressData['address1'] = `${address.primary_number} ${address.street_name}`;
    enteredAddressData['city'] = address.city_name;
    enteredAddressData['location'] = {lat: address.location.lat(), lng: address.location.lng()};
    enteredAddressData['state'] = address.state_abbreviation;
    enteredAddressData['product_slug'] = data.product_slug;
    enteredAddressData['source'] = DEFAULT_SOURCE_VALUE;
    const obj = {...utms};
    obj['arrival_time'] = Date.now();
    obj['path'] = window.location.pathname;
    obj['href'] = window.location.href;
    const result = new UAParser().getResult();
    obj['ua'] = result.ua;
    obj['browser_name'] = result.browser.name;
    obj['browser_version'] = result.browser.version;
    obj['browser_major'] = result.browser.major;
    obj['cpu_architecture'] = result.cpu.architecture;
    obj['engine_name'] = result.engine.name;
    obj['engine_version'] = result.engine.version;
    obj['os_name'] = result.os.name;
    obj['os_version'] = result.os.version;
    obj['inner_width'] = window.innerWidth;
    obj['inner_height'] = window.innerHeight;
    enteredAddressData['object'] = obj;
    submitAddressEntered(enteredAddressData);
    Raven.captureBreadcrumb({
      message: 'Address submit',
      category: 'action',
      data,
    });
  }

  handleAddressSubmit(lead) {
    this.trackAddressEntered(lead);
    this.showModal(lead);
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
    const {showLeadForm, lead} = this.state;
    const {product} = this.props;
    const {showProductField} = this.props;

    return (
      <div>
        <AddressInput
          getCheckedZIP={getCheckedZIP}
          onSubmit={this.handleAddressSubmit.bind(this)}
          product={product}
          showButton />
        <LeadForm
          lead={lead}
          onClose={this.handleCloseLeadForm.bind(this)}
          open={showLeadForm}
          product={product}
          showAddressInput={false}
          showProductField={showProductField} />
      </div>
    );
  }
}
