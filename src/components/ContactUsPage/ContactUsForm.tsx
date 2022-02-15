import React, {
  useState,
  useCallback,
  useEffect,
  FocusEvent,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

import {Button, Spinner, FormField, Input} from '@ergeon/core-components';
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';

import useFormValidation, {
  getNotEmptyValidator,
  getCharactersValidator,
  getEmailValidator,
} from './useValidation';

import './ContactUsForm.scss';
import ErrorField from './ErrorField';
import useSubmitForm from './useSubmitForm';
interface ContactUsFormProps {
  onSubmit(): void;
}

type formKey = 'name' | 'email' | 'message'

export default function ContactUsForm({onSubmit}: ContactUsFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    name: '',
    message: '',
    product: FENCE_SLUG,
  });
  const [blur, setBlur] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [error, setErrors] = useState<Record<string, string | undefined>>({});
  const getValidationErrors = useFormValidation<typeof form>({
    name: getNotEmptyValidator('Field is required'),
    email: getEmailValidator('Correct email should be provided'),
    message: getCharactersValidator('Field is required', 4096),
    global: () => '',
  });

  const handleSubmit = useSubmitForm({
    form,
    error,
    onSubmit,
    setErrors,
    setForm,
    setLoading,
  });

  const validateForm = useCallback(() => {
    const errors = getValidationErrors(form);
    if (isEqual(error, errors)) return;
    setErrors(errors);
  }, [form, error, getValidationErrors]);

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setBlur({...blur, [e.target.name]: true});
  };

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [event.target.name]: event.target.value});
    setBlur({...blur, [event.target.name]: false});
  };

  const isValid = (name: formKey) => {
    const isHasValue = !form?.[name].trim().length;
    const isValidAndBlur = blur?.[name] && !error?.[name];
    const isNotValid = blur?.[name] && error?.[name];
    if (isHasValue) return;
    if (isValidAndBlur) return true;
    if (isNotValid) return false;
    return;
  };

  const enableSubmit = () => {
    const errorValues = Object.values(error || {});
    const fieldValues = Object.values(form || {});
    const noErrors = errorValues.every((value) => value === undefined);
    const allFieldFilled = fieldValues.every((value) => !!value?.length);
    // no errors and all field filled
    if (noErrors && allFieldFilled) {
      return false;
    }
    return true;
  };

  return (
    <form className="ContactUsForm" onSubmit={handleSubmit}>
      <h4 className="center spacing after__is-30">Send us a message</h4>
      <FormField>
        <Input
          isDisabled={loading}
          isValid={isValid('name')}
          label={'Your name'}
          name={'name'}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={'e.g. John Smith'}
          type={'text'}
          value={form['name']}/>
        {blur['name'] && <ErrorField error={error?.name || ''} />}
      </FormField>
      <FormField>
        <Input
          isDisabled={loading}
          isValid={isValid('email')}
          label={'Your email'}
          name={'email'}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={'e.g. johnsmith@mail.com'}
          type={'email'}
          value={form['email']}/>
        {blur['email'] && <ErrorField error={error?.email || ''} />}
      </FormField>
      <FormField>
        <Input
          isDisabled={loading}
          isMultiline={true}
          isValid={isValid('message')}
          label={'Your message'}
          name={'message'}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={'e.g. Thanks ....'}
          type={'text'}
          value={form['message']}/>
        {blur['message'] && <ErrorField error={error?.message || ''} />}
      </FormField>
      <div className="Form-actions">
        {!enableSubmit() && <div className="Form-error">{error?.global}</div>}
        <Button
          className={classNames({'is-loading': loading})}
          disabled={enableSubmit() || loading}
          size="large"
          type="submit">
          {loading ? (
            <Spinner active={true} borderWidth={0.1} size={25} />
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </form>
  );
}
