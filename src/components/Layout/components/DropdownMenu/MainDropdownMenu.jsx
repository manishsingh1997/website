import React, {useMemo} from 'react';

import logOutIcon from '@ergeon/core-components/src/assets/icon-logout.brand.svg';
import userIcon from '@ergeon/core-components/src/assets/icon-user.brand.svg';

import {getMenuItems} from 'data/customer-app.ts';
import WebsiteDropdownMenu from './WebsiteDropdownMenu';

import '../../index.scss';

const MainDropdownMenu = (props) => {
  const {user} = props;

  const menuItems = useMemo(() => {
    const itemList = getMenuItems(`/app/${user.gid}`).map((item) => ({
      content: item.title,
      href: item.path,
      iconSVG: item.iconSVG,
    }));

    itemList[itemList.length - 1].special = true; // bottom line will be shown for special
    
    itemList.push({
      content: 'Log out',
      href: '/app/logout',
      iconSVG: logOutIcon,
    });
    return itemList;
  }, [user.gid]);

  return (
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
