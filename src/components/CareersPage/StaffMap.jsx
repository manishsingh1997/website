import React from 'react';

import MapComponent from '@ergeon/map-component';
import {Spinner, googleIntegration} from '@ergeon/core-components';

import {STAFF_MAP_GID} from 'website/constants';
import {getMapData} from 'api/map';

import './StaffMap.scss';
import {retryRequest} from '../../utils/utils';

const REQUEST_COUNT = 5;

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
      error: false,
    };
  }
  componentDidMount() {
    retryRequest(REQUEST_COUNT, async (error) => {
      if (error) {
        console.warn(error.message);
        this.setState((prevState) => {
          return {...prevState, error: true};
        });
        return;
      }
      await this.fetchMapData();
    });
  }

  async fetchMapData() {
    const {data: mapData} = await getMapData(STAFF_MAP_GID);
    if (!mapData) {
      throw new Error('Failed requesting map data');
    }
    const {markers = [], polygons = [], legend} = mapData;
    const {aspectRatio, popupBehaviour, controls, styles} = mapData?.config ?? this.state;
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
  }

  render() {
    const {markers, polygons, legend, aspectRatio, popupBehaviour, controls, styles, ready, error} = this.state;
    const loadingPlaceholder = <Spinner active={!ready} color="blue" size={48} />;
    const loader = <div className="loader-placeholder">{loadingPlaceholder}</div>;

    if (error) {
      return null;
    }

    if (!ready) {
      return loader;
    }

    return (
      <div className="staff-map">
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
      </div>
    );
  }
}
export default StaffMap;
