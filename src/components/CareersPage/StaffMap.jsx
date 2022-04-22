import React from 'react';
import MapComponent from '@ergeon/map-component';
import {Spinner} from '@ergeon/core-components';
import {googleIntegration} from '@ergeon/core-components';
import {STAFF_MAP_GID} from 'website/constants';
import {getMapData} from 'api/map';
import './StaffMap.scss';

class StaffMap extends React.Component {
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
    getMapData(STAFF_MAP_GID).then((response) => {
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
    const loadingPlaceholder = <Spinner active={!ready} color="blue" size={48} />;
    const loader = <div className="loader-placeholder">{loadingPlaceholder}</div>;
    return (
      <div className="staff-map">
        {!ready && loader}
        {ready && (
          <MapComponent
            aspectRatio={aspectRatio}
            controls={controls}
            fitBy="width"
            legend={legend}
            loadGoogleMapsLibrary={googleIntegration.getGoogleLoader()}
            loadingPlaceholder={loadingPlaceholder}
            markers={markers}
            polygons={polygons}
            popupBehaviour={popupBehaviour}
            styles={styles}
          />
        )}
      </div>
    );
  }
}
export default StaffMap;
