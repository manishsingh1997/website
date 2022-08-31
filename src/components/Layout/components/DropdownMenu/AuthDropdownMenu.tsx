import React from 'react';

import {ReactSVG} from 'react-svg';
import {Link} from 'react-router-dom';
import {Button} from '@ergeon/core-components';
import IconPhone from '@ergeon/core-components/src/assets/icon-phone-green.svg';
import IconUser from '@ergeon/core-components/src/assets/icon-user.brand.svg';

import {ERGEON1_PHONE} from '../../../../website/constants';

import '../../index.scss';

const SIGN_IN_LINK_ID = 'app-sign-in-link';

interface AuthDropdownMenu {
  onGetQuoteClick?(): void;
}

const AuthDropdownMenu = ({onGetQuoteClick}: AuthDropdownMenu) => {
  return (
    <>
      <a className="PhoneButton-alt" href={`tel:${ERGEON1_PHONE}`}>
        <li className="link">
          <ReactSVG src={IconPhone} />
          1-888-ERGEON1
        </li>
      </a>
      {onGetQuoteClick &&
        <Button className="QuoteButton QuoteButton-alt" flavor="action" onClick={onGetQuoteClick}>
          Get a Quote
        </Button>
      }
      <Link className="sign-in-link" key="dropp-sign-in" to="/app/sign-in">
        <li className="link link-wrapper" id={SIGN_IN_LINK_ID}>
          <ReactSVG className="sign-in-icon" src={IconUser} />
          <span className="user-full-name">Sign In</span>
        </li>
      </Link>
    </>
  );
};

export default AuthDropdownMenu;
