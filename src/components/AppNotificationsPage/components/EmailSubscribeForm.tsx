import React, {FormEvent} from 'react';

import classNames from 'classnames';
import {Button, Checkbox, Spinner} from '@ergeon/core-components';
import './EmailSubscribeForm.scss';

interface EmailSubscribeFormProps {
  isSubscribedToNews: boolean | null;
  isSaving: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleCheckChange: (value: boolean) => void;
  primaryEmail: string | null;
}

const EmailSubscribeForm = (props: EmailSubscribeFormProps) => {
  const {
    isSubscribedToNews,
    isSaving,
    handleSubmit,
    handleCheckChange,
    primaryEmail
  } = props;
  return (
    <form className="email-subscribe-form" onSubmit={handleSubmit}>
      <div className="spacing after__is-24">
        <label className="label">Email</label>
        <div className="title-group spacing after__is-24">
          <p className='small-text'>
            {primaryEmail}
          </p>
        </div>
        <Checkbox
          checked={isSubscribedToNews}
          disabled={isSaving}
          onClick={(value: boolean) => handleCheckChange(value)}>
          <div data-testid="isSubscribedToNews">
            <div className='title-group'>
              <h6>Company News</h6>
              <p className='small-text'>
                I'm ok to receive interesting home improvement insights from Ergeon over email
              </p>
            </div>
          </div>
        </Checkbox>
      </div>
      <Button
        className={classNames({'is-loading': isSaving})}
        data-testid='update-preferences'
        disabled={isSaving}
        size="large"
        type="submit">
          {
            isSaving ? 
              <Spinner active={true} borderWidth={0.1} size={25} /> : 
              <div className='title-group'>
                <p className='small-text'>Update preferences</p>
              </div>
          }
      </Button>
    </form>
  )
};

export default EmailSubscribeForm;
