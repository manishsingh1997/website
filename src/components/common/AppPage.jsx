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

  state = {
    isFetchStarted: false, // needed to not render content before `fetchData` starts
  };

  componentDidMount() {
    this.props.fetchData();
    this.setFetchDataStarted();
  }

  setFetchDataStarted() {
    this.setState({isFetchStarted: true});
  }

  renderError(error) {
    console.warn('Error during rendering customer-app page', error);
    const errorMessage =
      error.data && Object.values(error.data).map((message, index) => <p key={`app-error-${index}`}>{message}</p>);
    return (
      <div className="center error">
        {errorMessage ? (
          <React.Fragment>{errorMessage}</React.Fragment>
        ) : (
          <React.Fragment>
            <p>Something unexpected happened, we are already notified about this.</p>
            <p>Please try to reload the page.</p>
          </React.Fragment>
        )}
      </div>
    );
  }

  renderContent() {
    if (!this.state.isFetchStarted || this.props.isLoading) {
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
        <h4 className="flex-row align-center">{renderHeader()}</h4>
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}
