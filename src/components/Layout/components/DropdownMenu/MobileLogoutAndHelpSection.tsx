import React from 'react';

import {NavLink} from 'react-router-dom';
import {ReactSVG} from 'react-svg';

import {MobileLogoutAndHelpSectionProps} from './types';

const MobileLogoutAndHelpSection = ({menuItem}: MobileLogoutAndHelpSectionProps) => {
  const {href, iconSVG, content} = menuItem;

  return (
    <NavLink activeClassName="active-link" className="menu-item" to={href}>
      <div className="logout-menu-title">
        <ReactSVG src={iconSVG} />
        <span className="menu-item-content">{content}</span>
      </div>
    </NavLink>
  );
};

export default MobileLogoutAndHelpSection;
