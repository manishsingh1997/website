import React from 'react';
// @ts-ignore
import MapComponent from '@ergeon/map-component';
import {Spinner, googleIntegration} from '@ergeon/core-components';
import iconMarker from 'assets/marker.svg';
import CustomerGIDContext from '../../context-providers/CustomerGIDContext';
import DataRow from '../../components/common/DataRow';
import {getFormattedAddress} from '../../utils/app-house';
import AppPage from '../../components/common/AppPage';
import AppSubCard from '../../components/common/AppSubCard';
import {HouseType} from '../types';

import './index.scss';

export type AppHouseListPageProps = {
  getHouses: (customerGID: number) => void,
  houses: HouseType[],
  isListLoading: boolean,
  listError: null | []
}

export default class AppHouseListPage extends React.Component<AppHouseListPageProps> {

  static contextType = CustomerGIDContext;

  fetchData() {
    const {getHouses} = this.props;
    const customerGID = this.context;
    getHouses(customerGID);
  }

  renderListElementContent(house: HouseType) {
    const mapControls = {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };

    const locationMarker = {
      info: '',
      position: {
        lat: house['address'] && house['address']['latitude'],
        lng: house['address'] && house['address']['longitude'],
      },
      icon: iconMarker,
    };

    return (
      <div className="flex-wrapper">
        <div>
          <DataRow title="Address" value={getFormattedAddress(house)} />
        </div>
        {house['address'] && (
          <div className="map-wrapper">
            <MapComponent
              aspectRatio="4:3"
              controls={mapControls}
              fitBy="width"
              loadGoogleMapsLibrary={googleIntegration.getGoogleLoader()}
              loadingPlaceholder={<Spinner active={true} color="blue" size={32} />}
              markers={[locationMarker]}
              popupBehaviour="close"
              styles={[{stylers: [{saturation: -100}]}]}
              zoom={14}
            />
          </div>
        )}
      </div>
    );
  }

  renderContent() {
    const {houses} = this.props;

    return (
      <React.Fragment>
        {houses &&
          houses.map((house, cnt) => (
            <AppSubCard
              key={`house-${house.id}`}
              renderContent={this.renderListElementContent.bind(this, house)}
              renderHeader={() => `House #${cnt + 1}`}
            />
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
        renderHeader={() => 'Houses'}
      />
    );
  }
}
