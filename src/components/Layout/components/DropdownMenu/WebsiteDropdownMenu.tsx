// We expect this file and component to be deleted, when the TODO requirement is done
import React from 'react';
import {NavLink} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

import {DropdownMenu} from '@ergeon/core-components';

import {MenuItem} from './types';

import '../../index.scss';

// TODO: Update DropdownMenu in core-components so it can render <Link to=""> instead of <a href="">
class WebsiteDropdownMenu extends DropdownMenu {
  renderMenuItem({content, href, iconSVG, special, onClick}: MenuItem, index: number) {
    return (
      <NavLink
        activeClassName="active-link"
        className={classNames('menu-item', {special})}
        key={index}
        onClick={() => {
          // We ignore typescript here pending a todo requirement to update DropdownMenu component in core-component
          // @ts-ignore
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