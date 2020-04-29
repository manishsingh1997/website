import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

import {getBaseEventData} from '@ergeon/erg-utms';
import {Button, Spinner} from '@ergeon/core-components';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';

import {
  createValidator,
  email,
  maxLengthFactory,
  required,
} from 'utils/validation';
import {submitContactUs} from 'api/contactUs';
import {parseError} from 'utils/utils';
import {
  identify,
  track,
  trackError,
} from 'utils/analytics';

import {DEFAULT_SOURCE_VALUE} from 'website/constants';
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';
import {CONTACT_US_MESSAGE_ENTERED} from 'utils/events';

import './ContactUsForm.scss';

const getInitialState = () => {

  return {
    validateOnChange: false,
    data: {
      email: '',
      name: '',
      comment: '',
      product: FENCE_SLUG,
    },
    errors: null,
    loading: false,
  };
};

export default class ContactUsForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const validateField = {
      email: [required, email],
      comment: [required, maxLengthFactory(4096)],
      name: [required],
    };
    this.validator = createValidator(validateField);
    this.state = getInitialState();
  }

  handleSubmit = async e => {
    e.preventDefault();

    const {onSubmit} = this.props;
    const {data} = this.state;
    const errors = this.validator(data);
    if (errors) {
      this.setState({
        errors,
        validateOnChange: true,
      });
    } else {
      this.setState({
        loading: true,
        errors: null,
      });

      const baseEventData = await getBaseEventData();
      const eventData = {...baseEventData, ...data};
      Sentry.addBreadcrumb({
        message: 'Contact us message submit',
        category: 'action',
        data: eventData,
      });
      submitContactUs(eventData).then((res) => {
        identify(data);
        track(CONTACT_US_MESSAGE_ENTERED, {
          ...eventData,
          source: DEFAULT_SOURCE_VALUE,
        });
        this.setState(getInitialState());
        onSubmit && onSubmit();
        return res;
      }, (error) => {
        trackError(new Error(`Contact us message submit error: ${parseError(error)}`, eventData));
        this.setState({
          errors: {
            global: parseError(error),
          },
          loading: false,
        });
      });
    }
  };

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

  render() {
    const {data: {email, name, comment}, errors, loading} = this.state;

    return (
      <form className="ContactUsForm" onSubmit={this.handleSubmit}>
        <h4 className="center spacing after__is-30">Send us a message</h4>
        <div className={classNames('Form-field', {'is-error': errors && errors.name})}>
          <TextInput
            disabled={loading}
            labelName="Your name"
            name="name"
            onChange={this.handleFieldChange}
            placeholder="e.g. John Smith"
            type="text"
            value={name} />
          {errors && <div className="Form-error">{errors.name}</div>}
        </div>
        <div className={classNames('Form-field', {'is-error': errors && errors.email})}>
          <TextInput
            disabled={loading}
            labelName="Email"
            name="email"
            onChange={this.handleFieldChange}
            placeholder="e.g. username@mail.com"
            type="email"
            value={email} />
          {errors && <div className="Form-error">{errors.email}</div>}
        </div>
        <div className={classNames('Form-field', {'is-error': errors && errors.comment})}>
          <TextArea
            disabled={loading}
            labelName="Message"
            name="comment"
            onChange={this.handleFieldChange}
            placeholder="Add your message here"
            type="text"
            value={comment} />
          {errors && <div className="Form-error">{errors.comment}</div>}
        </div>
        <div className="Form-actions">
          {errors && <div className="Form-error">{errors.global}</div>}
          <Button
            className={classNames({'is-loading': loading})}
            disabled={loading}
            size="large"
            type="submit">{loading ? <Spinner active={true} borderWidth={0.10} size={25} /> : 'Submit'}</Button>
        </div>
      </form>
    );
  }
}
