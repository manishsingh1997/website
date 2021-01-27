import React from 'react';
import LocationsMap from './LocationsMap';
import './index.scss';

class LocationsPage extends React.Component {

  renderPhoneNumber(phone) {
    return (
      <p className="p_phone">Phone: <a href={`tel:+1${phone}`}>{phone}</a></p>
    );
  }

  render() {
    const locationsContent = (
      'We provide service to over 4.3 million households and businesses in the Bay Area, Sacramento and Fresno.'
    );
    const locationsMap = <LocationsMap/>;
    return (
      <div className="locations-page wrapper-1180">
        <div className="locations__header">
          <h1 className="h2">Our Locations</h1>
          <p className="paragraph-3">
            {locationsContent}
          </p>
        </div>
        <div className="nice_view_map">{locationsMap}</div>
        <div className="locations">
          <div className="locations_tile">
            <address className="location_item">
              <h5 className="header_with_map_icon">San Jose</h5>
              <p className="p_location">7239 Glenview Dr. San Jose, CA 95120</p>
              {this.renderPhoneNumber('669-201-9553')}
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Oakland</h5>
              <p className="p_location">360 Grand Ave. #368, Oakland, CA 94610</p>
              {this.renderPhoneNumber('510-851-9822')}
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Sacramento</h5>
              <p className="p_location">915 L St. #419, Sacramento, CA 95814</p>
              {this.renderPhoneNumber('916-347-4601')}
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Napa</h5>
              <p className="p_location">952 School St. #324, Napa, CA 94559</p>
              {this.renderPhoneNumber('707-722-9455')}
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Watsonville</h5>
              <p className="p_location">1961 Main St. #345, Watsonville, CA 95076</p>
              {this.renderPhoneNumber('831-888-4375')}
            </address>
            <address className="location_item">
              <h5 className="header_with_map_icon">Fresno</h5>
              <p className="p_location">7726 N First St. #375, Fresno, CA 93720</p>
              {this.renderPhoneNumber('559-236-5266')}
            </address>
          </div>
          <div className="nice_view">{locationsMap}</div>
        </div>
      </div>
    );
  }
}

export default LocationsPage;
