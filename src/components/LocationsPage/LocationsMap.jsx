import React from 'react';

import MapComponent from '@ergeon/map-component';
import {Spinner, googleIntegration} from '@ergeon/core-components';

import {LOCATIONS_MAP_GID} from 'website/constants';
import {getMapData} from 'api/map';

class LocationsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      polygons: [],
      popupBehaviour: 'close',
      controls: {disableDefaultUI: true},
      styles: [],
      aspectRatio: '16:9',
      ready: false,
    };
  }
  componentDidMount() {
    getMapData(LOCATIONS_MAP_GID).then((response) => {
      const mapData = response.data;
      const {markers, polygons, legend} = mapData;
      const {aspectRatio, popupBehaviour, controls, styles} = mapData.config;
      this.setState({
        markers,
        polygons,
        legend,
        aspectRatio,
        popupBehaviour,
        controls,
        styles,
        ready: true,
      });
    });
  }
  render() {
    const {markers, polygons, legend, aspectRatio, popupBehaviour, controls, styles, ready} = this.state;
    const loadingPlaceholder = <Spinner active={!ready} color="blue" size={12} />;
    const loader = <div className="loader-placeholder">{loadingPlaceholder}</div>;
    const mapElementClass = 'locations-map';
    return (
      <React.Fragment>
        {!ready && loader}
        {ready && (
          <MapComponent
            asFragment={true}
            aspectRatio={aspectRatio}
            controls={controls}
            fitBy="none"
            legend={legend}
            loadGoogleMapsLibrary={googleIntegration.getGoogleLoader()}
            loadingPlaceholder={loadingPlaceholder}
            mapElementClass={mapElementClass}
            markers={markers}
            polygons={polygons}
            popupBehaviour={popupBehaviour}
            styles={styles}
          />
        )}
      </React.Fragment>
    );
  }
}

export default LocationsMap;
