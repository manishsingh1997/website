import {useCallback} from 'react';

import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';
import isEmail from 'validator/lib/isEmail';

export type Dictionary<T> = {[key: string]: T};

type ValidationFn = (value: string) => string | undefined;

type ValidationDescription = Dictionary<ValidationFn>;
type ValidationErrors<T extends Dictionary<string>> = {
  [key in keyof T]: string | undefined;
};

export default function useFormValidation<T extends Dictionary<string>>(validation: ValidationDescription) {
  return useCallback(
    (values: T): ValidationErrors<T> => mapValues(values, (value, key: keyof T) => validation[key as string]?.(value)),
    [validation]
  );
}

const validate = (predicate: boolean, {error}: {error: string}) => {
  if (!predicate) return error;
};

export const getNotEmptyValidator = (error: string): ValidationFn => {
  return (value: string) => validate(!isEmpty(value), {error});
};

export const getCharactersValidator = (error: string, count: number): ValidationFn => {
  return (value: string) =>
    validate(!isEmpty(value) && value.length <= count, {
      error,
    });
};

export const getEmailValidator = (error: string): ValidationFn => {
  return (value: string) => validate(isEmail(value), {error});
};
