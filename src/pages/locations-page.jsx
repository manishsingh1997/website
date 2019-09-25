import React from 'react';
import MetaTags from 'react-meta-tags';

import './locations-page.scss';
class LocationsPage extends React.Component {

  render() {
    return (
      <div className="locations-page wrapper-1180">
        <MetaTags>
          <title>Ergeon Locations</title>
          <meta
            content="We provide service to over 3.5 million households in the Bay Area and Sacramento."
            name="description" />
          <meta
            content="We provide service to over 3.5 million households in the Bay Area and Sacramento."
            name="og:description" />
        </MetaTags>
        <div className="locations__header">
          <h2>Our Locations</h2>
          <p className="paragraph-3">
            We provide service to over 3.5 million households in the Bay Area and Sacramento.
          </p>
        </div>
        <div className="nice_view_map"></div>
        <div className="locations">
          <div className="locations_tile">
            <address className="location_item">
              <h5 className="header_with_map_icon">Palo Alto</h5>
              <p className="p_location">459 Hamilton Ave. #203, Palo Alto, CA 94301</p>
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">San Jose</h5>
              <p className="p_location">88 S. 3rd St. #253, San Jose, CA 95113</p>
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Oakland</h5>
              <p className="p_location">360 Grand Ave. #368, Oakland, CA 94610</p>
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Sacramento</h5>
              <p className="p_location">915 L St. #419, Sacramento, CA 95814</p>
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Santa Rosa</h5>
              <p className="p_location">1007 West College Ave. #419, Santa Rosa, CA 95401</p>
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Watsonville</h5>
              <p className="p_location">1961 Main St. #345, Watsonville, CA 95076</p>
            </address>
          </div>
          <div className="nice_view"></div>
        </div>
      </div>
    );
  }
}

export default LocationsPage;