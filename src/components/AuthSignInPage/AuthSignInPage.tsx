import classNames from 'classnames';
import React, {Fragment, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';

import {Button, FormField, Input, Spinner} from '@ergeon/core-components';
import LockIcon from '@ergeon/core-components/src/assets/icon-lock.svg';

import SingleCard from '../common/SingleCard';
import Success from '../common/Success';
import {AuthSignInErrors} from './types';
import useHandleSubmit from './useHandleSubmit';

import './index.scss';

const AuthSignInPage = () => {
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<AuthSignInErrors>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useHandleSubmit({email, setLoading, setErrors, setIsFormSuccess});

  const handleEmailChange = useCallback((_event: Event, _name: string, value: string) => {
    setEmail(value);
    setErrors(null);
  }, []);

  const renderErrors = useCallback((fieldName: 'global' | 'email') => {
    const fieldErrors = errors?.[fieldName];
    if (!fieldErrors) return <Fragment/>;
    return (
      <div className="spacing after__is-6">
        {fieldErrors.map((error: string, i: number) => (
          <div className="signin-form-error" key={i}>
            {error}
          </div>
        ))}
      </div>
    );
  }, [errors]);

  const renderForm = useCallback(() => {
    return (
      <div>
        <div className="center spacing after__is-24">
          <img className="icon-lock" src={LockIcon} />
        </div>
        <h1 className="h4 center spacing after__is-12">Sign in to Ergeon</h1>
        <p className="center signin-page__form-header small-text spacing after__is-24">
          <i>New to ergeon?</i> <Link to="/request-quote">Request a quote</Link>.
        </p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <FormField>
            <>
              <Input
                isDisabled={loading}
                isValid={errors?.email ? errors.email.length === 0: null}
                label="Email"
                name="email"
                onChange={handleEmailChange}
                placeholder="e.g. username@mail.com"
                type="email"
                value={email}
              />
              {renderErrors('email')}
            </>
          </FormField>
          <div className="signin-form-actions">
            {renderErrors('global')}
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
  }, [loading, errors, handleEmailChange, handleSubmit]);

  const renderSuccess = useCallback(() => {
    return <Success header="We have sent you an email with a link to sign in" />;
  }, []);

  return <SingleCard className="signin-page" content={isFormSuccess ? renderSuccess() : renderForm()} />;
};

export default AuthSignInPage;
