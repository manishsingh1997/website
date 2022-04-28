import classNames from 'classnames';
import React from 'react';
import {Link} from 'react-router-dom';

import {authService} from 'utils/auth';
import {Button, FormField, Input, Spinner} from '@ergeon/core-components';
import LockIcon from '@ergeon/core-components/src/assets/icon-lock.svg';

import Success from 'components/common/Success';
import SingleCard from 'components/common/SingleCard';
import {createValidator, email, required} from 'utils/validation';

import './index.scss';

class AuthSignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.validator = createValidator({
      email: [required, email],
    });
  }

  state = {
    isFormSuccess: false,
    email: '',
    errors: null,
    loading: false,
  };

  async handleSubmit(e) {
    e.preventDefault();

    const {email} = this.state;
    let errors = this.validator({email});
    if (!errors) {
      errors = await this.requestSignIn.bind(this)(email);
    }
    if (errors) {
      this.setState({errors});
    } else {
      this.setState({isFormSuccess: true});
    }
  }

  async requestSignIn(email) {
    this.setState({loading: true});
    let errors = null;
    try {
      await authService.requestOTP(email, 'email');
    } catch (signInError) {
      // TODO: move response formatting to erg-customer-auth-js
      if (
        signInError.response &&
        signInError.response.status < 500 &&
        signInError.response.data &&
        (signInError.response.data.identifier || signInError.response.data['non_field_errors'])
      ) {
        errors = {
          email: signInError.response.data.identifier,
          global: signInError.response.data['non_field_errors'],
          ...signInError.response.data,
        };
      } else {
        console.error(signInError);
        errors = {global: ['Unexpected error, we are already notified about this.']};
      }
    } finally {
      this.setState({loading: false});
    }
    return errors;
  }

  handleFieldChange = (event, name, value) => {
    const newState = {
      email: value,
      errors: null,
    };
    this.setState(newState);
  };

  renderErrors(fieldName) {
    const {errors} = this.state;
    return (
      <div className="spacing after__is-6">
        {errors &&
          errors[fieldName] &&
          errors[fieldName].map((error, i) => (
            <div className="signin-form-error" key={i}>
              {error}
            </div>
          ))}
      </div>
    );
  }

  renderForm() {
    const {email, errors, loading} = this.state;
    return (
      <div>
        <div className="center spacing after__is-24">
          <img className="icon-lock" src={LockIcon} />
        </div>
        <h1 className="h4 center spacing after__is-12">Sign in to Ergeon</h1>
        <p className="center signin-page__form-header small-text spacing after__is-24">
          <i>New to ergeon?</i> <Link to="/request-quote">Request a quote</Link>.
        </p>
        <form className="signin-form" onSubmit={this.handleSubmit.bind(this)}>
          <FormField>
            <>
            <Input
              isDisabled={loading}
              isValid={errors?.email ? !errors?.email : null}
              label="Email"
              name="email"
              onChange={this.handleFieldChange}
              placeholder="e.g. username@mail.com"
              type="email"
              value={email}
            />
            {this.renderErrors('email')}
            </>
          </FormField>
          <div className="signin-form-actions">
            {this.renderErrors('global')}
            <Button className={classNames({'is-loading': loading})} disabled={loading} size="large" type="submit">
              {loading ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Sign in with email'}
            </Button>
          </div>
          <div className="center signin-form-footer spacing before__is-12">
            <i>We will send you an email with a link for sign in</i>
          </div>
        </form>
      </div>
    );
  }

  renderSuccess() {
    return <Success header="We have sent you an email with a link to sign in" />;
  }

  render() {
    const {isFormSuccess} = this.state;

    return <SingleCard className="signin-page" content={isFormSuccess ? this.renderSuccess() : this.renderForm()} />;
  }
}

export default AuthSignInPage;
