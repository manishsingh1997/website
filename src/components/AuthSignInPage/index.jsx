import React from 'react';
import {Link} from 'react-router-dom';

import {Button, Spinner} from '@ergeon/core-components';
import LockIcon from '@ergeon/core-components/src/assets/icon-lock.svg';

import TextInput from 'components/common/TextInput';
import Success from 'components/common/Success';
import {
  createValidator,
  email,
  required,
} from 'utils/validation';

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
    data: {
      email: null,
    },
    validateOnChange: false,
    errors: null,
  };

  handleSubmit = (e) => {
    // TODO: implement me
    console.log('handelSubmit', e);
    e.preventDefault();
    this.setState({isFormSuccess: true});

    const {data} = this.state;
    const errors = this.validator(data);
    if (errors) {
      this.setState({
        errors,
        validateOnChange: true,
      });
    }
  }

  handleFieldChange = (name, value) => {
    const {data, validateOnChange} = this.state;
    const newState = {
      data: {
        ...data,
        [name]: value,
      },
    };

    if (validateOnChange) {
      newState.errors = this.validator(newState.data);
    }
    this.setState(newState);
  };

  renderErrors(fieldName) {
    const {errors} = this.state;
    return (
      <div className="spacing after__is-6">
        {errors && errors[fieldName] && errors[fieldName].map((error, i) =>
          <div className="signin-form-error" key={i}>{error}</div>)
        }
      </div>
    );
  }

  renderForm() {
    const loading = false;
    const {data: {email}, errors} = this.state;

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
            {this.renderErrors('email')}
          </div>
          <div className="signin-form-actions">
            {this.renderErrors('global')}
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
