import React from 'react';
import {Link} from 'react-router-dom';

import {Button, Spinner} from '@ergeon/core-components';
import LockIcon from '@ergeon/core-components/src/assets/icon-lock.svg';

import TextInput from 'components/common/TextInput';
import Success from 'components/common/Success';

import './index.scss';

class AuthSignInPage extends React.Component {

  state = {
    isFormSuccess: false,
  };

  handleSubmit = (e) => {
    // TODO: implement me
    e.preventDefault();
    this.setState({isFormSuccess: true});
    console.log('handelSubmit', e);
  }

  handleFieldChange = (name, value) => {
    // TODO: implement me
    console.log('handleFieldChange');
    console.log('name', name);
    console.log('value', value);
  };

  renderForm() {
    // TODO: assign correct values
    const errors = {
      // email: 'Incorrect email',
      // global: 'Something wrong',
    };
    const loading = false;
    const email = '';

    return (
      <div>
        <div className="center spacing after__is-24">
          <img className="icon-lock" src={LockIcon} />
        </div>
        <h4 className="center spacing after__is-12">Sign in to Ergeon</h4>
        <p className="center signin-page__form-header small-text spacing after__is-24">
          <i>New to ergeon?</i> <Link to="/request-quote">Request a quote</Link>.
        </p>
        <form className="signin-form" onSubmit={this.handleSubmit}>
          <div className={`signin-form-field ${errors && errors.email && 'is-error'}`}>
            <TextInput
              disabled={loading}
              labelName="Email"
              name="email"
              onChange={this.handleFieldChange}
              placeholder="e.g. username@mail.com"
              type="email"
              value={email} />
            {errors && <div className="signin-form-error">{errors.email}</div>}
          </div>
          <div className="signin-form-actions">
            {errors && <div className="signin-form-error">{errors.global}</div>}
            <Button
              className={`${loading && 'is-loading'}`}
              disabled={loading}
              size="large"
              type="submit">
              {loading ? <Spinner active={true} borderWidth={0.10} size={25} /> : 'Sign in with email'}
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
    return <Success header="We have sent you email with a link for sign in" />;
  }

  render() {
    const {isFormSuccess} = this.state;

    return (
      <div className="signin-page">
        <div className="signin-page__form">
          {isFormSuccess ? this.renderSuccess() : this.renderForm()}
        </div>
        <div className="center small-text spacing before__is-24">
          <Link to="/">Back to home page</Link>
        </div>
      </div>
    );
  }

}

export default AuthSignInPage;
