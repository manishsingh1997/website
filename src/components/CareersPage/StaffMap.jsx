import React from 'react';
import config from 'website/config';
import MapComponent from '@ergeon/map-component';
import {Spinner} from '@ergeon/core-components';
import markers from 'data/map-employees.js';

import './StaffMap.scss';

class StaffMap extends React.Component {
  render() {
    const loadingPlaceholder = <Spinner active={true} color="green" size={32} />;
    const controls = {disableDefaultUI: true};
    return (
      <div className="staff-map">
        <MapComponent
          apiKey={config.googleMapsApiKey}
          controls={controls}
          loadingPlaceholder={loadingPlaceholder}
          markers={markers}
          popupBehaviour="close" />
      </div>
    );
  }
}
export default StaffMap;
