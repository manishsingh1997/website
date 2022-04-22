import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import {Button, Spinner} from '@ergeon/core-components';

import SingleCard from 'components/common/SingleCard';
import Success from 'components/common/Success';

class AuthLogoutPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    redirectNow: false,
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.logout();
  }

  renderConfirmation() {
    const {
      auth: {isAuthLoading, logoutError},
    } = this.props;

    return (
      <div className="center">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h4 className="spacing after__is-12">Logout</h4>
          <p className="spacing after__is-24">Are you sure you want to logout?</p>
          {logoutError && (
            <p className="error spacing after__is-12 small-text">Something unexpected happened, please try again</p>
          )}
          <Button
            className={classNames({'is-loading': isAuthLoading})}
            disabled={isAuthLoading}
            size="large"
            type="submit"
          >
            {isAuthLoading ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Yes, Logout'}
          </Button>
        </form>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className="center">
        <h4>Not signed in</h4>
        <p>Sorry, you are not signed it yet</p>
        <Link to="/app/sign-in">
          <Button className="spacing before__is-12" size="large" type="submit">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  renderSuccess() {
    setTimeout(() => this.setState({redirectNow: true}), 2500);
    return <Success header="Hope to see you soon!" text="You'll be redirected to home page shortly" />;
  }

  render() {
    const {redirectNow} = this.state;
    const {
      auth: {user, isUserLoggedOut},
    } = this.props;

    if (redirectNow) {
      return <Redirect to="/" />;
    }

    let content = null;
    if (isUserLoggedOut) {
      content = this.renderSuccess();
    } else if (!user) {
      content = this.renderNotLoggedIn();
    } else {
      content = this.renderConfirmation();
    }

    return <SingleCard content={content} />;
  }
}

export default AuthLogoutPage;
