import React, {useCallback} from 'react';

import {useHistory, useLocation} from 'react-router-dom';
import {Button} from '@ergeon/core-components';
import IconWarning from '@ergeon/core-components/src/assets/icon-warning.svg';
import IconMark from '@ergeon/core-components/src/assets/icon-success.svg';
import IconArrow from '@ergeon/core-components/src/assets/icon-arrow-down.svg';

import './ProjectSignOffTopNav.scss';

type ProjectSignOffTopNavProp = {
  isSigned: boolean;
};

const ProjectSignOffTopNav = (props: ProjectSignOffTopNavProp) => {
  const {isSigned} = props;
  const history = useHistory();
  const location = useLocation();

  const onClick = useCallback(() => {
    history.push(`${location.pathname}/sign-off`);
  }, [history, location]);

  return (
    <Button
      className="ProjectSignOff-topNav"
      data-testid="signoff-top-nav"
      flavour="solid"
      onClick={onClick}
      taste="regular">
      <div className="ProjectSignOff-topNav-desc" data-testid="signoff-topNav">
        {isSigned ? <img className="icon" src={IconMark} /> : <img className="icon" src={IconWarning} />}
        <h5>Project Sign-Off {isSigned && 'Complete'}</h5>
      </div>
      {!isSigned && <img alt="Project signoff" className="icon icon-arrow" src={IconArrow} />}
    </Button>
  );
};

export default ProjectSignOffTopNav;
