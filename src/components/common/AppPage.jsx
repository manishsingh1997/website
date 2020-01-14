import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AppLoader from 'components/common/AppLoader';

import './AppPage.scss';

export default class AppPage extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.object,
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    renderContent: PropTypes.func.isRequired,
    renderHeader: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchData();
  }

  renderError(error) {
    console.warn(error);
    return (
      <div className="center error">
        <p>Something unexpected happened, we are already notified about this.</p>
        <p>Please try to reload the page.</p>
      </div>
    );
  }

  renderContent() {
    if (this.props.isLoading) {
      return <AppLoader />;
    }
    if (this.props.error) {
      return this.renderError(this.props.error);
    }
    return this.props.renderContent();
  }

  render() {

    const {className, renderHeader} = this.props;

    return (
      <div className={classNames({'app-page': true, [className]: !!className})}>
        <h4 className="flex-row align-center">
          {renderHeader()}
        </h4>
        <div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
