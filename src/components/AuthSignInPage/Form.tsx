import React, {Fragment, useCallback, useState} from 'react';

import classNames from 'classnames';
import {Button, FormField, Input, Spinner} from '@ergeon/core-components';
import LockIcon from '@ergeon/core-components/src/assets/icon-lock.svg';

import {AuthSignInErrors} from './types';
import useHandleSubmit from './useHandleSubmit';

import './Form.scss';

type AuthSignInPageFormType = {
  bottomContent?: React.ReactNode,
  children?: React.ReactNode,
  next?: string,
  onFormSuccess(isFormSuccess: boolean): void,
  title: string,
};

const AuthSignInPageForm = (props: AuthSignInPageFormType) => {
  const {bottomContent, children, next, onFormSuccess, title} = props;

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<AuthSignInErrors>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useHandleSubmit({email, next, setLoading, setErrors, setIsFormSuccess: onFormSuccess});

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

  return (
    <div>
      <div className="center spacing after__is-24">
        <img className="icon-lock" src={LockIcon} />
      </div>
      <h1 className="h4 center spacing after__is-24">{title}</h1>
      {children}
      <form className="signin-form" onSubmit={handleSubmit}>
        <FormField>
          <>
            <Input
              isDisabled={loading}
              isValid={errors?.email ? errors.email.length === 0: null}
              label="Please enter your email"
              name="email"
              onChange={handleEmailChange}
              placeholder="e.g. username@mail.com"
              type="email"
              value={email}
            />
            {renderErrors('email')}
          </>
        </FormField>
        <div className="center signin-form-footer">
          <i>We will send you an email with a verification link</i>
        </div>
        <div className="signin-form-actions">
          {renderErrors('global')}
          <Button className={classNames({'is-loading': loading})} disabled={loading} size="large" type="submit">
            {loading ? <Spinner active={true} borderWidth={0.1} size={25} /> : 'Submit'}
          </Button>
        </div>
        {bottomContent}
      </form>
    </div>
  );
};

export default AuthSignInPageForm;
