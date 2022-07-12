import React from 'react';
import {Link} from 'react-router-dom';

import userIcon from '@ergeon/core-components/src/assets/icon-user.brand.svg';

import '../../index.scss';

const SIGN_IN_LINK_ID = 'app-sign-in-link';

const AuthDropdownMenu = () => {
  return (
    <Link className="sign-in-link" key="dropp-sign-in" to="/app/sign-in">
      <li className="link-wrapper" id={SIGN_IN_LINK_ID}>
        <img className="sign-in-icon" src={userIcon} />
        <span className="user-full-name">Sign In</span>
      </li>
    </Link>
  );
};

export default AuthDropdownMenu;
