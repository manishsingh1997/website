import React from 'react';
import PropTypes from 'prop-types';

import {Places, Spinner} from '@ergeon/core-components';
import MapComponent from '@ergeon/map-component';

import Marker from 'assets/marker.svg';
import config from 'website/config';
import CustomerGIDContext from 'context-providers/CustomerGIDContext';
import DataRow from 'components/common/DataRow';

import AppPage from 'components/common/AppPage';
import AppSubCard from 'components/common/AppSubCard';

const {GoogleMapsLoader} = Places;
GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];

import './index.scss';

export default class AppHouseListPage extends React.Component {

  static propTypes = {
    getHouses: PropTypes.func.isRequired,
    houses: PropTypes.array,
    isListLoading: PropTypes.bool.isRequired,
    listError: PropTypes.object,
  };

  static contextType = CustomerGIDContext;

  fetchData() {
    const {houses, getHouses} = this.props;
    const customerGID = this.context;
    if (!houses) {
      getHouses(customerGID);
    }
  }

  getAddress(house) {
    return house['address']['formatted_address'];
  }

  renderListElementContent(house) {

    const mapControls = {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };

    const locationMarker = {
      'info': '',
      'position': {
        'lat': house['address']['latitude'],
        'lng': house['address']['longitude'],
      },
      'icon': Marker,
    };

    return (
      <div className="flex-wrapper">
        <div>
          <DataRow title="Address" value={this.getAddress(house)} />
        </div>
        <div className="map-wrapper">
          <MapComponent
            apiKey={config.googleMapsApiKey}
            aspectRatio="4:3"
            controls={mapControls}
            loadGoogleMapsLibrary={GoogleMapsLoader.load}
            loadingPlaceholder={<Spinner active={true} color="green" size={32} />}
            markers={[locationMarker]}
            popupBehaviour="close"
            styles={[{'stylers': [{'saturation': -100}]}]}
            zoom={14} />
        </div>
      </div>
    );
  }

  renderContent() {
    const {houses} = this.props;

    return (
      <React.Fragment>
        {houses && houses.map((house, cnt) => (
          <AppSubCard
            key={`house-${house.id}`}
            renderContent={this.renderListElementContent.bind(this, house)}
            renderHeader={() => `House #${cnt + 1}`} />
        ))}
      </React.Fragment>
    );
  }

  render() {

    return (
      <AppPage
        className="house-list-page"
        error={this.props.listError}
        fetchData={this.fetchData.bind(this)}
        isLoading={this.props.isListLoading}
        renderContent={this.renderContent.bind(this)}
        renderHeader={() => 'Houses'} />
    );
  }
}
