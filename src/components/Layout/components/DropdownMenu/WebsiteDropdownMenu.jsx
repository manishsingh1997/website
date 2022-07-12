import React from 'react';
import {NavLink} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

import {DropdownMenu} from '@ergeon/core-components';

import '../../index.scss';

// TODO: Update DropdownMenu in core-components so it can render <Link to=""> instead of <a href="">
class WebsiteDropdownMenu extends DropdownMenu {
  renderMenuItem({content, href, iconSVG, special, onClick}, index) {
    return (
      <NavLink
        activeClassName="active-link"
        className={classNames('menu-item', {special})}
        key={index}
        onClick={() => {
          this.setState({showMenu: false});
          onClick && onClick();
        }}
        to={href}
      >
        <div className="menu-title">
          <span className={'icon'}>
            <ReactSVG src={iconSVG} />
          </span>
          <span>{content}</span>
        </div>
      </NavLink>
    );
  }
}

export default WebsiteDropdownMenu;
