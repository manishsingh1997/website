import React from 'react';
import PropTypes from 'prop-types';
import {EmergencyNotification} from '@ergeon/core-components';

export default class COVIDNotification extends React.Component {
  static propTypes = {
    location: PropTypes.object,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const {location} = this.props;
    return (
      location.pathname === '/' && <EmergencyNotification/>
    );
  }
}