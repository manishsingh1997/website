import React, {useCallback, useMemo} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';

import {Button} from '@ergeon/core-components';

import IconWarning from '@ergeon/core-components/src/assets/icon-warning.svg';
import IconMark from '@ergeon/core-components/src/assets/icon-success.svg';
import iconSave from '@ergeon/core-components/src/assets/icon-save.svg';

import { ProjectSignOffProps } from './types';

import './ProjectSignOff.scss';

const ProjectSignOff = (props: ProjectSignOffProps) => {
  const { isSigned, pdfURL, signedDate } = props;

  const history = useHistory();
  const location = useLocation();

  const signeeDate = useMemo(() => {
    if (signedDate) {
      return moment(signedDate).format('MMM DD, YYYY, H:mm a');
    }
    return null;
  }, [signedDate]);

  const signedClass = useMemo(() => {
    return classNames('Project-signOff', {
      'Project-signOff-signed': isSigned,
    });
  }, [isSigned]);

  const onClick = useCallback(()=> {
    history.push(`${location.pathname}/sign-off`)
  }, [history, location])

  const signOffInfo = useMemo(() => {
    return (
      <>
        <div className="Project-signOff-title">
          <img className="icon" src={isSigned ? IconMark : IconWarning} />
          <h4>Project Sign-Off {isSigned && 'Complete'}</h4>
        </div>
        {isSigned
        ? <span className="Project-signOff-date">Signed off at {signeeDate}</span>
        : <span className="Project-signOff-content">
            Sign this form if you have completed the walk-through inspection & are satisfied with the services provided.
        </span>
        }
      </>
    );
  }, [isSigned, signeeDate]);

  return (
    <div className={signedClass}>
      <div className="Project-signOff-desc">
          {signOffInfo}
      </div>
      {!isSigned && (
        <Button  className="Project-signOff-button" flavor="cta" onClick={onClick} taste="solid">
          Begin Project Sign-Off
        </Button>
      )}
      {isSigned && (
        <a className="Project-signOff-pdf" href={pdfURL} rel="noreferrer" target='_blank'>
          <Button  className="Project-signOff-button button-pdf" flavor="regular" taste="solid">
            Sign-Off PDF <img alt="save pdf" className="icon-save" src={iconSave} />
          </Button>
        </a>
      )}
    </div>
  );
};

export default ProjectSignOff;
