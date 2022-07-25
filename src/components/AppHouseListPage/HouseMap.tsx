import {googleIntegration, Spinner} from '@ergeon/core-components';
// @ts-ignore
import MapComponent from '@ergeon/map-component';
import React from 'react';
import iconMarker from 'assets/marker.svg';
import {HouseAddress} from '../types';

const HouseMap = ({address}: {address: HouseAddress}) => {
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
      lat: address.latitude,
      lng: address.longitude,
    },
    icon: iconMarker,
    iconScaledSize: 21,
  };

  const spinner = <Spinner active={true} color="blue" size={24} />;

  return (
    <div className="map-wrapper">
      <MapComponent
        aspectRatio="4:3"
        controls={mapControls}
        fitBy="width"
        loadGoogleMapsLibrary={googleIntegration.getGoogleLoader()}
        loadingPlaceholder={spinner}
        markers={[locationMarker]}
        popupBehaviour="close"
        styles={[{stylers: [{saturation: -100}]}]}
        zoom={14}
      />
    </div>
  );
};

export default HouseMap;
