import React from 'react';
import PropTypes from 'prop-types';
import {random, some} from 'lodash';

import {Button, Places, Spinner} from '@ergeon/core-components';
import {calcUtils, constants} from '@ergeon/3d-lib';
import MapComponent from '@ergeon/map-component';

import Marker from 'assets/marker.svg';
import config from 'website/config';
import {getParameterByName} from 'utils/utils';
import {getCheckedZIP, getPriceAndDescription} from 'api/lead';
import Success from 'components/common/Success';
import LeadForm from './LeadForm';
import ConfigCart from './ConfigCart';

import './index.scss';

const {GoogleMapsLoader, parsePlace} = Places;
GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];

export default class RequestQuotePage extends React.Component {

  static propTypes = {
    addConfig: PropTypes.func.isRequired,
    address: PropTypes.string,
    configs: PropTypes.array,
    lead: PropTypes.object,
    openAddressUpdatePopup: PropTypes.func.isRequired,
    product: PropTypes.string,
    updateAddress: PropTypes.func.isRequired,
    zipcode: PropTypes.string,
  };

  state = {
    showThankYou: false,
  };

  async componentDidMount() {
    let {zipcode, configs} = this.props;
    const address = getParameterByName('address');
    const product = getParameterByName('product') || this.props.product;
    const schema = getParameterByName('schema');
    const code = getParameterByName('code');
    const length = getParameterByName('length');

    GoogleMapsLoader.load(google => window.google = google);

    if (address) {
      const {DEFAULT_ZIP} = constants;
      const placeData = await this.getPlaceData(address);
      const checkedZipResponse = await getCheckedZIP(placeData.zipcode);
      zipcode = checkedZipResponse.data.supported ? placeData.zipcode : DEFAULT_ZIP;
      this.props.updateAddress({
        address: placeData,
        'product_slug': product,
        productAvailability: checkedZipResponse.data,
        zipcode,
      });
    }

    if (schema && code) {
      const {TYPES, CATALOG_TYPE_FENCE, CATALOG_TYPE_GATE} = constants;
      const data = calcUtils.getValueFromUrl(window.location.href);
      const schemaCode = calcUtils.getSchemaCodeFromState(data);

      if (some(configs, config => config.code == schemaCode)) return;

      const priceAndDescription = await getPriceAndDescription(data, zipcode);
      // const preview = await getPreviewImage(data);
      const preview = null; // TODO: Use generated preview image once the function is working
      const itemId = random(0, 1, true).toString(36).slice(2);
      const item = {
        id: itemId,
        'catalog_type': data[TYPES] ? CATALOG_TYPE_FENCE : CATALOG_TYPE_GATE,
        code: schemaCode,
        product: data,
        preview,
        description: priceAndDescription['description'],
        price: priceAndDescription['unit_price'],
        units: length || 1,
      };
      this.props.addConfig(item);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) {
      window.onInitMap && window.onInitMap();
    }
  }

  getPlaceData(address) {
    return new Promise((resolve, reject) => {
      GoogleMapsLoader.load(google => {
        const geocode = new google.maps.Geocoder();
        geocode.geocode({address}, (results, status) => {
          if (results.length) {
            resolve(parsePlace(results[0]));
          } else if (status !== google.maps.GeocoderStatus.OK) {
            console.error('Google Geocoder error:', status);
            reject(results, status);
          }
        });
      });
    });
  }

  isItSupportedArea() {
    const {product, lead} = this.props;

    if (
      lead &&
      lead.productAvailability &&
      lead.productAvailability.supported &&
      lead.productAvailability.products[product]
    ) {
      return true;
    }

    return false;
  }

  openAddressUpdatePopup() {
    this.props.openAddressUpdatePopup();
  }

  getStreetAddress() {
    const {address} = this.props;

    if (address) {
      return address.split(',')[0];
    }

    return null;
  }

  getCityAddress() {
    const {address} = this.props;

    if (address) {
      const separationIndex = address.indexOf(',');
      return address.slice(separationIndex + 2);
    }

    return null;
  }

  getLocationMarker() {
    const {lead: {address}} = this.props;
    let location;

    if (typeof address.location.lat === 'function') {
      location = {
        lat: address.location.lat(),
        lng: address.location.lng(),
      };
    } else {
      location = {
        lat: address.location? address.location.lat : null,
        lng: address.location? address.location.lng : null,
      };
    }

    return {
      'info': '',
      'position': location,
      icon: Marker,
    };
  }

  getMapControls() {
    return {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };
  }

  renderHeaderMessage() {
    if (!this.props.lead) {
      return (
        <div className="request-quote-page__header-message">
          <h4 className="title">You haven&apos;t entered your address</h4>
          <p className="Subtitle">
            <a onClick={this.openAddressUpdatePopup.bind(this)}>Add your address </a>
             to get a better price estimation
          </p>
        </div>
      );
    }

    if (!this.isItSupportedArea()) {
      return (
        <div className="request-quote-page__header-message">
          <h4 className="title">We&apos;re not in your area yet</h4>
          <p className="subtitle">
            Your house is not in a neighborhood we support right now.
            We&apos;re showing prices for San Francisco Bay Area.
            See where we are currently available
            <a href="https://www.ergeon.com/locations" rel="noopener noreferrer" target="_blank"> here</a>.
          </p>
        </div>
      );
    }

    return (
      <div className="request-quote-page__header-message">
        <h4 className="title">Get your free custom quote</h4>
        <p className="subtitle">
          Enter your contact information below and our experts will be
          in touch within 24 hours to discuss your project further.
        </p>
      </div>
    );
  }

  renderSignupMap() {
    const {lead} = this.props;
    const styles = [{'stylers': [{'saturation': -100}]}];

    if (!lead || !lead.address) {
      return null;
    }

    return (
      <div className="request-quote-page__signup-map">
        <div className="AddressContainer">
          <div className="Address">
            <div className="AddressStreet">
              {this.getStreetAddress()}
            </div>
            <div className="AddressCity">
              {this.getCityAddress()}
            </div>
          </div>
          <Button
            className="EditButton"
            flavor="regular"
            onClick={this.openAddressUpdatePopup.bind(this)}
            size="small">
            Edit
          </Button>
        </div>
        <hr />
        <div className="request-quote-page__signup-map-wrapper">
          <MapComponent
            apiKey={config.googleMapsApiKey}
            aspectRatio="4:3"
            controls={this.getMapControls()}
            loadGoogleMapsLibrary={false}
            loadingPlaceholder={<Spinner active={true} color="green" size={32} />}
            markers={[this.getLocationMarker()]}
            popupBehaviour="close"
            styles={styles}
            zoom={16} />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.showThankYou) {
      return (
        <div className="request-quote-page">
          <Success
            header="We’ll be in touch shortly"
            text="Our team will reach out within 24 hours to give you a quote" />
        </div>
      );
    }

    return (
      <div className="request-quote-page">
        {this.renderHeaderMessage()}
        <div className="lead-area">
          <div className="request-quote-page__lead-form">
            <LeadForm
              lead={this.props.lead || {}}
              onSubmit={() => this.setState({showThankYou: true})}
              product={this.props.product}
              showProductField/>
          </div>
          {this.renderSignupMap()}
        </div>
        <ConfigCart />
      </div>
    );
  }
}
