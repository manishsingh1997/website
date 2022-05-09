import {MouseEvent} from 'react';
import * as Sentry from '@sentry/browser';
import mapValues from 'lodash/mapValues';

// @ts-ignore
import {getBaseEventData} from '@ergeon/erg-utms';
// @ts-ignore
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';

import {submitContactUs} from '../../api/contactUs';
import {parseError} from '../../utils/utils';
import {identify, track, trackError} from '../../utils/analytics';
import {DEFAULT_SOURCE_VALUE} from '../../website/constants';
import {CONTACT_US_MESSAGE_ENTERED} from '../../utils/events';

export interface FormFieldState {
  name: string;
  email: string;
  message: string;
  product: string;
}

interface SubmitFormProps {
  form: FormFieldState;
  error: Record<string, string | undefined>;
  onSubmit(): void;
  setLoading(arg: boolean): void;
  setErrors(arg: Record<string, string | undefined>): void;
  setForm(arg: FormFieldState): void;
}

const useSubmitForm = ({form, error, onSubmit, setLoading, setErrors, setForm}: SubmitFormProps) => {
  return async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isHasError = error?.['email'] || error?.['message'] || error?.['name'];
    if (isHasError) {
      return;
    }

    setLoading(true);
    setErrors(mapValues(error, () => undefined));
    const baseEventData = await getBaseEventData();
    const eventData = {...baseEventData, ...form};
    try {
      Sentry.addBreadcrumb({
        message: 'Contact us message submit',
        category: 'action',
        data: eventData,
      });
      const response = submitContactUs(eventData);
      identify(form);
      track(CONTACT_US_MESSAGE_ENTERED, {
        ...eventData,
        source: DEFAULT_SOURCE_VALUE,
      });
      setForm({
        email: '',
        name: '',
        message: '',
        product: FENCE_SLUG,
      });
      onSubmit && onSubmit();
      setLoading(false);
      return response;
    } catch (err) {
      trackError(new Error(`Contact us message submit error: ${parseError(err)}`), eventData);
      setErrors({...error, global: parseError(err)});
      setLoading(false);
    }
  };
};

export default useSubmitForm;
