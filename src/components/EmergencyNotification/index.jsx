import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Notification} from '@ergeon/core-components';
import ls from 'local-storage';
import './index.scss';
const NOTIFICATION_MARK = 'erg-notifications';
const DEFAULT_MARK = {covid19: 3};
const FINAL_DATE = 1587081600000; // 04.17.2020
let notificationMark = ls.get(NOTIFICATION_MARK)? ls.get(NOTIFICATION_MARK) : DEFAULT_MARK;

export default class EmergencyNotification extends React.Component {

  static propTypes = {
    location: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      display: this.checkConditions(),
    };
  }
  checkConditions() {
    const {location} = this.props;
    const pathname = location? location.pathname : '/';
    return (pathname === '/') && (notificationMark.covid19 > 0) && Date.now() < FINAL_DATE;
  }
  onClose() {
    this.setState({display: false});
    notificationMark.covid19 -= 1;
    ls.set(NOTIFICATION_MARK, notificationMark);
  }
  render() {
    const {display} = this.state;
    return (
      <React.Fragment>
        {display &&
        <div className="area-of-emergency-notification">
          <div className="wrapper-1180">
            <Notification
              className="spacing before__is-12 after__is-12"
              mode="floating"
              onClose={this.onClose.bind(this)}
              type="Warning">
              <h6 className="additional-header spacing after__is-6">COVID-19 (Coronavirus)</h6>
              Please review our updated policies during the Coronavirus Covid-19
              <Link to={'/help/202000375'}> here</Link>
            </Notification>
          </div>
        </div>}
      </React.Fragment>
    );
  }
}