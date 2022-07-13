import React from 'react';
import {Link} from 'react-router-dom';

import {Spinner} from '@ergeon/core-components';
import userIcon from '@ergeon/core-components/src/assets/icon-user.brand.svg';

import '../../index.scss';

const LoadingDropdownMenu = () => {
  return (
    <Link className="sign-in-link" key="dropp-loading" to="/app/sign-in">
      <li className="link-wrapper" data-testid="sign-in-item">
        <div className="icon-and-arrow">
          <span>
            <img className="sign-in-icon" src={userIcon} />
          </span>
          <Spinner active={true} borderWidth={0.1} color="blue" size={16} />
        </div>
      </li>
    </Link>
  );
};

export default LoadingDropdownMenu;
