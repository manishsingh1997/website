import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

import {Button, Spinner} from '@ergeon/core-components';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';

import {
  createValidator,
  email,
  maxLengthFactory,
  required,
} from 'utils/validation';
import ls from 'local-storage';
import {submitContactUs} from 'api/contactUs';
import {
  getEventData,
  parseError,
} from 'utils/utils';
import {
  identify,
  track,
  trackError,
  LS_KEY,
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

  handleSubmit = (e) => {
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
      const submitData = getEventData(data);
      Sentry.addBreadcrumb({
        message: 'Contact us message submit',
        category: 'action',
        data: submitData,
      });
      submitContactUs(submitData).then((res) => {
        identify(data);
        track(CONTACT_US_MESSAGE_ENTERED, {
          ...submitData,
          source: DEFAULT_SOURCE_VALUE,
        });
        this.setState(getInitialState());
        onSubmit && onSubmit();
        ls.remove(LS_KEY);
        return res;
      }, (error) => {
        trackError(new Error(`Contact us message submit error: ${parseError(error)}`, submitData));
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
    const {data: {email, name, message}, errors, loading} = this.state;

    return (
      <form className="ContactUsForm" onSubmit={this.handleSubmit}>
        <h4 className="center spacing after__is-30">Send us a message</h4>
        <div className={`Form-field ${errors && errors.name && 'is-error'}`}>
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
        <div className={`Form-field ${errors && errors.email && 'is-error'}`}>
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
        <div className={`Form-field ${errors && errors.comment && 'is-error'}`}>
          <TextArea
            disabled={loading}
            labelName="Message"
            name="comment"
            onChange={this.handleFieldChange}
            placeholder="Add your message here"
            type="text"
            value={message} />
          {errors && <div className="Form-error">{errors.comment}</div>}
        </div>
        <div className="Form-actions">
          {errors && <div className="Form-error">{errors.global}</div>}
          <Button
            className={`${loading && 'is-loading'}`}
            disabled={loading}
            size="large"
            type="submit">{loading ? <Spinner active={true} borderWidth={0.10} size={25} /> : 'Submit'}</Button>
        </div>
      </form>
    );
  }
}
