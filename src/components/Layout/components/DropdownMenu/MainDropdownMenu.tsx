import React, {useMemo} from 'react';

import logOutIcon from '@ergeon/core-components/src/assets/icon-logout.brand.svg';
import userIcon from '@ergeon/core-components/src/assets/icon-user.brand.svg';

import {getMenuItems} from '../../../../data/customer-app';
import WebsiteDropdownMenu from './WebsiteDropdownMenu';

import '../../index.scss';
import {MenuItem, user} from './types';

interface MainDropdownMenuProps {
  user: user;
}

const MainDropdownMenu = (props: MainDropdownMenuProps) => {
  const {user} = props;

  const menuItems = useMemo(() => {
    const itemList = getMenuItems(`/app/${user.gid}`, null).map(
      (item): MenuItem => ({
        content: item.title,
        href: item.path,
        iconSVG: item.iconSVG,
      })
    );

    itemList[itemList.length - 1].special = true; // bottom line will be shown for special

    itemList.push({
      content: 'Log out',
      href: '/app/logout',
      iconSVG: logOutIcon,
    });
    return itemList;
  }, [user.gid]);

  return (
    // [ENG-16361] Refactor DropdownMenu in core-components so it can render <Link to=""> instead of <a href="">
    // @ts-ignore
    <WebsiteDropdownMenu
      items={menuItems}
      key="dropp-user"
      title={
        <span key="dropp-user-icon">
          <div className="user-name-menu-item">
            <img className="sign-in-icon" src={userIcon} />
            <span className="user-full-name">{user.full_name}</span>
          </div>
        </span>
      }
    />
  );
};

export default MainDropdownMenu;
