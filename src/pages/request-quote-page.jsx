import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Places, Spinner} from '@ergeon/core-components';
import MapComponent from '@ergeon/map-component';

import Marker from 'assets/marker.svg';
import config from 'libs/config';
import {actionTriggers as addressActionTriggers} from 'actions/address-actions';
import {getParameterByName} from 'libs/utils/utils';
import {getCheckedZIP} from 'libs/api';
import LeadForm from 'components/home-page-blocks/lead-form';
const {GoogleMapsLoader, parsePlace} = Places;

import './request-quote-page.scss';
class RequestQuotePage extends React.Component {

  static propTypes = {
    address: PropTypes.string,
    dispatch: PropTypes.func,
    lead: PropTypes.object,
    product: PropTypes.string,
  };

  state = {
    showThankYou: false,
  };

  componentDidMount() {
    const address = getParameterByName('address');
    const product = getParameterByName('product') || this.props.product;

    if (address) {
      GoogleMapsLoader.load(google => {
        const geocode = new google.maps.Geocoder();
        geocode.geocode({address}, results => {
          if (results.length) {
            const placeData = parsePlace(results[0]);
            getCheckedZIP(placeData.zipcode).then(response => {
              this.props.dispatch(addressActionTriggers.updateAddress({
                address: placeData,
                'product_slug': product,
                productAvailability: response.data,
              }));
            }, error => {
              console.log(error);
              this.setState({
                error: 'Server is not responding',
              });
            });
          }
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) {
      window.onInitMap && window.onInitMap();
    }
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
    this.props.dispatch(addressActionTriggers.openAddressUpdatePopup());
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

  renderThankYou() {
    return (
      <div className="ThankYou">
        <div className="Success">
          <div className="Success-line Success-lineLong" />
          <div className="Success-line Success-lineTip" />
          <div className="Success-ring" />
          <div className="Success-hideCorners" />
        </div>
        <h3 className="center spacing after__is-12">We’ll be in touch shortly</h3>
        <p className="subheader h3 center">Our team will reach out within 24 hours to give you a quote</p>
      </div>
    );
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
          {this.renderThankYou()}
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
      </div>
    );
  }
}

export default connect(state => {
  return {
    address: state.address.address,
    lead: state.address.lead,
    product: state.address.product,
  };
})(RequestQuotePage);