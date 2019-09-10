import './staff-map.scss';
import React from 'react';

class StaffMap extends React.Component {

  render() {
    return (
      <div className="staff-map">
        <iframe
          frameBorder="0"
          height="630px"
          src="https://s3-us-west-2.amazonaws.com/ergeon.com/staff-map/index.html"
          style={{padding: 0, margin:0}}
          width="100%"/>
      </div>

    );
  }
}
export default StaffMap;
