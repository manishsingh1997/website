import React from 'react';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';
import {Button, Spinner, googleIntegration} from '@ergeon/core-components';
import {calcUtils} from '@ergeon/3d-lib';
// @ts-ignore
import MapComponent from '@ergeon/map-component';
// @ts-ignore
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';
import AppLoader from '../common/AppLoader';
import Marker from '../../assets/marker.svg';
import Success from '../common/Success';
import ConfigCart from '../../containers/ConfigCart';
import {getParameterByName, showUpcomingFeatures} from '../../utils/utils';
import LeadForm from './components/LeadForm';
import TermsFooter from './components/TermsFooter';
import {RequestQuotePageProps, RequestQuotePageState} from './types';
import './index.scss';

const REDIRECT_TIMEOUT = 5000;

class RequestQuotePage extends React.Component<RequestQuotePageProps, RequestQuotePageState> {
  state = {
    showThankYou: false,
    showConfigCart: false,
    showStyleBrowser: false,
  };

  componentDidMount() {
    const {zipcode, configs} = this.props;
    const address = getParameterByName('address') || this.props.address;
    const product = getParameterByName('product') || this.props.product;
    const schema = getParameterByName('schema');
    const code = getParameterByName('code');
    const grade = getParameterByName('grade') as number | undefined;
    const length = getParameterByName('length') as number | undefined;
    const productConfig = schema && code ? calcUtils.getValueFromUrl(window.location.search) : null;
    const schemaCode = productConfig ? calcUtils.getSchemaCodeFromState(productConfig) : '';

    this.props.updateLeadAndConfig({
      address,
      product,
      zipcode,
      data: productConfig,
      schemaCode,
      length,
      grade,
      configs,
    });
  }

  componentDidUpdate(prevProps: RequestQuotePageProps) {
    if (prevProps.address !== this.props.address) {
      window.onInitMap && window.onInitMap();
    }
    // automatically redirect the user to our home page
    if (this.state.showThankYou) {
      setTimeout(() => {
        this.props.history.push('/');
      }, REDIRECT_TIMEOUT);
    }
    this.updateAddress();
  }

  updateAddress() {
    // If we don't have address in GET params or in props
    // we should use customer main address and update address redux store
    const {user} = this.props.auth;
    let address = this.props.address;
    if (!address && user && user['main_address']) {
      address = user['main_address']['formatted_address'];
      const {zipcode} = this.props;
      const product = getParameterByName('product') || this.props.product;
      this.props.updateLeadFromAddress({
        address,
        product,
        zipcode,
      });
    }
  }

  isItSupportedArea() {
    const {lead, product} = this.props;

    return !!(
      lead &&
      lead.productAvailability &&
      lead.productAvailability.supported &&
      lead.productAvailability.products[product]
    );
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
    const {lead} = this.props;

    const address = lead?.address;
    let location;

    if (typeof address?.location.lat === 'function' && typeof address?.location.lng === 'function') {
      location = {
        lat: address.location.lat(),
        lng: address.location.lng(),
      };
    } else {
      location = {
        lat: address?.location ? address.location.lat : null,
        lng: address?.location ? address.location.lng : null,
      };
    }

    return {
      info: '',
      position: location,
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

  get isConfigCartDisplayed() {
    const {showConfigCart} = this.state;
    const {product, configs} = this.props;
    return product === FENCE_SLUG && (showConfigCart || configs.length > 0);
  }

  renderHeaderMessage() {
    if (!this.props.lead) {
      return (
        <div className="request-quote-page__header-message" data-testid="no-lead-notification">
          <h1 className="h3 title">You haven&apos;t entered your address</h1>
          <p className="Subtitle">
            <a onClick={this.openAddressUpdatePopup.bind(this)}>Add your address </a>
            to get a better price estimation
          </p>
        </div>
      );
    }

    if (!this.isItSupportedArea()) {
      return (
        <div className="request-quote-page__header-message" data-testid="not-supported-zipcode-notification">
          <h1 className="h3 title">We&apos;re not in your area yet</h1>
          <p className="subtitle">
            Your house is not in a neighborhood we support right now. We&apos;re showing prices for San Francisco Bay
            Area. See where we are currently available
            <a href="https://www.ergeon.com/cities/" rel="noopener noreferrer" target="_blank">
              {' '}
              here
            </a>
            .
          </p>
        </div>
      );
    }

    return (
      <div className="request-quote-page__header-message" data-testid="supported-zipcode-notification">
        <h1 className="h3 title">Get your free custom quote</h1>
        <p className="subtitle">
          Enter your contact information below and our experts will be in touch within 24 hours to discuss your project
          further.
        </p>
      </div>
    );
  }

  renderSignupMap() {
    const {lead} = this.props;
    const styles = [{stylers: [{saturation: -100}]}];

    if (!lead || !lead.address) {
      return null;
    }

    return (
      <div className="request-quote-page__signup-map" data-testid="signup-map">
        <div className="AddressContainer">
          <div className="Address">
            <div className="AddressStreet" data-testid="signup-map-street-address">
              {this.getStreetAddress()}
            </div>
            <div className="AddressCity" data-testid="signup-map-city-address">
              {this.getCityAddress()}
            </div>
          </div>
          <Button
            className="EditButton"
            data-testid="address-edit-button"
            flavor="regular"
            onClick={this.openAddressUpdatePopup.bind(this)}
            size="small"
            taste="line"
          >
            Edit
          </Button>
        </div>
        <hr />
        <div className="request-quote-page__signup-map-wrapper" data-testid="map-component">
          <MapComponent
            aspectRatio="4:3"
            controls={this.getMapControls()}
            fitBy="width"
            loadGoogleMapsLibrary={googleIntegration.getGoogleLoader()}
            loadingPlaceholder={<Spinner active={true} color="blue" size={32} />}
            markers={[this.getLocationMarker()]}
            popupBehaviour="close"
            styles={styles}
            zoom={16}
          />
        </div>
      </div>
    );
  }

  renderMobileAddress() {
    return (
      <div className="lead-area__mobile-address" data-testid="mobile-address-field">
        <div className="lead-area__mobile-address__field" onClick={this.openAddressUpdatePopup.bind(this)}>
          <div className="left-part">
            <div className="label">Street address:</div>
            {this.getStreetAddress()}
          </div>
          <div className="right-part">
            <Button flavor="regular" onClick={this.openAddressUpdatePopup.bind(this)} size="small" taste="line">
              Edit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      auth: {isAuthLoading, isUserLoading, user},
      updateProduct,
      product,
      lead,
      configs,
    } = this.props;

    const {showStyleBrowser} = this.state;

    if (isAuthLoading || isUserLoading) {
      return <AppLoader />;
    }

    if (this.state.showThankYou) {
      return (
        <div className="request-quote-page" data-testid="thank-you-notification">
          <Success header="Thanks!" text="We will call you within 24 hours" />
          {showUpcomingFeatures('ENG-1XX') && !user && (
            <span>
              <p className="confirmation-email spacing before__is-24" data-testid="thank-you-notification-text">
                We have sent a confirmation message to your email. Please follow the instructions there.
              </p>
            </span>
          )}
        </div>
      );
    }
    const footerClassNames = classNames({
      'top-border': !this.isConfigCartDisplayed,
    });
    return (
      <div className="request-quote-page">
        <div className="lead-area">
          {this.renderHeaderMessage()}
          <div className="lead-area__flex-wrapper">
            <div className="request-quote-page__lead-form">
              {
                <LeadForm
                  configs={configs}
                  lead={lead}
                  mobileAddressField={this.getStreetAddress() && this.renderMobileAddress()}
                  onAddConfigClick={() => this.setState({showStyleBrowser: true, showConfigCart: true})}
                  onProductChange={(product: string) => updateProduct(product)}
                  onSubmit={() => this.setState({showThankYou: true})}
                  product={product}
                  user={user}
                />
              }
            </div>
            {this.renderSignupMap()}
          </div>
        </div>
        {this.isConfigCartDisplayed && (
          <ConfigCart
            onShowStyleBrowserChange={(value: boolean) => this.setState({showStyleBrowser: value})}
            showStyleBrowser={showStyleBrowser}
          />
        )}
        <TermsFooter className={footerClassNames} />
      </div>
    );
  }
}

export default withRouter(RequestQuotePage);
