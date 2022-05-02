import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import ExpiredLinkIcon from '@ergeon/core-components/src/assets/icon-expired-link.svg';
import InvalidLockIcon from '@ergeon/core-components/src/assets/icon-link-is-not-valid.svg';
import ErrorIcon from '@ergeon/core-components/src/assets/icon-error.svg';
import {Button, Spinner} from '@ergeon/core-components';

import Success from 'components/common/Success';
import SingleCard from 'components/common/SingleCard';
import {getAuthOTPCode} from 'utils/auth';

import './index.scss';

class AuthConfirmSignInPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    authenticateUserWithCode: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    resendLink: PropTypes.func.isRequired,
  };

  state = {
    redirectNow: false,
  };

  componentDidMount() {
    const otpCode = getAuthOTPCode(this.props.location.search);
    if (otpCode) {
      this.props.authenticateUserWithCode(otpCode);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const otpCode = getAuthOTPCode(this.props.location.search);
    this.props.resendLink(otpCode);
  }

  renderSuccess() {
    setTimeout(() => this.setState({redirectNow: true}), 2000);
    return <Success header="Thanks for email confirmation!" text="You'll be redirected shortly" />;
  }

  renderInvalidCode() {
    return (
      <div className="center">
        <div className="center spacing after__is-24">
          <img className="icon-invalid-lock" src={InvalidLockIcon} />
        </div>
        <h4 className="center spacing after__is-12">Sorry, but the link is not valid</h4>
        <Link to="/app/sign-in">
          <Button className="spacing before__is-12" size="large" type="submit">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  renderUnknownError(errorCode) {
    return (
      <div className="center">
        <div className="center spacing after__is-24">
          <img className="icon-invalid-lock" src={ErrorIcon} />
        </div>
        <h4 className="center spacing after__is-12">
          {`Sorry, unexpected error happened (${errorCode}). Please try again.`}
        </h4>
      </div>
    );
  }

  renderExpiredCode() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="center">
          <div className="center spacing after__is-24">
            <img className="icon-invalid-lock" src={ExpiredLinkIcon} />
          </div>
          <h4 className="center spacing after__is-12">Expired Link</h4>
          <div>Sorry, but the link you have used was already expired. Try to resend a confirmation email.</div>
          <Button className="spacing before__is-12" size="large" type="submit">
            Resend
          </Button>
        </div>
      </form>
    );
  }

  renderLoader(text) {
    return (
      <div className="center">
        <h4 className="center spacing after__is-24">{text}</h4>
        <Spinner active={true} borderWidth={0.1} color="blue" size={48} />
      </div>
    );
  }

  renderSuccessResendLink() {
    return <Success header="We have sent you an email with a link to sign in" />;
  }

  render() {
    const {redirectNow} = this.state;
    const {auth} = this.props;

    if (redirectNow) {
      return <Redirect to={`/app/${auth.user.gid}/orders`} />;
    }
    let content = null;
    if (auth.isAuthLoading || auth.isUserLoading) {
      content = this.renderLoader('Verifying the link, please wait');
    } else if (auth.isResendLinkLoading) {
      content = this.renderLoader('Resending the link, please wait');
    } else if (auth.isResendLinkSuccess) {
      content = this.renderSuccessResendLink();
    } else if (auth.resendLinkError) {
      content = this.renderInvalidCode();
    } else if (!auth.authError && auth.user && auth.userSetByCode) {
      content = this.renderSuccess();
    } else if (auth.authError && auth.authError.data.otp) {
      const error = auth.authError.data.otp.errorCode;
      if (error === 'invalid') content = this.renderInvalidCode();
      else if (error === 'expired') content = this.renderExpiredCode();
    } else if (auth.authError) {
      content = this.renderUnknownError(auth.authError.statusCode);
    } else {
      content = this.renderInvalidCode();
    }

    return <SingleCard className="confirm-signin-page" content={content} />;
  }
}

export default AuthConfirmSignInPage;
