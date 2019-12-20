import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';

import InvalidLockIcon from '@ergeon/core-components/src/assets/icon-link-is-not-valid.svg';
import {Button, Spinner} from '@ergeon/core-components';

import Success from 'containers/common/Success';
import BackToHomeLink from 'components/common/BackToHomeLink';

import './index.scss';

class AuthConfirmSignInPage extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    authenticateUserWithCode: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    redirectNow: false,
  };

  componentDidMount() {
    const parsedQuery = queryString.parse(this.props.location.search);
    if (parsedQuery.code) {
      this.props.authenticateUserWithCode(parsedQuery.code);
    }
  }

  renderSuccess() {
    setTimeout(() => this.setState({redirectNow: true}), 2000);
    return (
      <Success
        header="Thanks for email confirmation!"
        text="You'll be redirected shortly" />
    );
  }

  renderInvalidCode() {

    return (
      <div className="center">
        <div className="center spacing after__is-24">
          <img className="icon-invalid-lock" src={InvalidLockIcon} />
        </div>
        <h4 className="center spacing after__is-12">Sorry, but the link is not valid</h4>
        <Link to="/app/sign-in">
          <Button
            className="spacing before__is-12"
            size="large"
            type="submit">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  renderLoader() {
    return (
      <div className="center">
        <h4 className="center spacing after__is-24">Verifying the link, please wait</h4>
        <Spinner active={true} borderWidth={0.10} color="green" size={48}/>
      </div>
    );
  }

  render() {
    const {redirectNow} = this.state;
    const {auth} = this.props;

    if (redirectNow) {
      return <Redirect to={`/app/${auth.user.gid}/orders`} />;
    }

    let content = null;
    if (auth.isAuthLoading) {
      content = this.renderLoader();
    } else {
      if (!auth.authError && auth.user) {
        content = this.renderSuccess();
      } else {
        content = this.renderInvalidCode();
      }
    }

    return (
      <div className="confirm-signin-page">
        <div className="confirm-signin-page__content">
          {content}
        </div>
        <BackToHomeLink />
      </div>
    );
  }

}

export default AuthConfirmSignInPage;
