import classNames from 'classnames';
import React, {useMemo} from 'react';
import {ReactSVG} from 'react-svg';

import profileIcon from '@ergeon/core-components/src/assets/icon-profile.svg';
import homeIcon from '@ergeon/core-components/src/assets/icon-home-black.svg';

import {getMyAccountMenuItems, getMyProjectsMenuItems} from '../../../data/customer-app';
import {getUnsubscribeCodeFromQuery} from '../../../utils/app-notifications';
import PathNavLink from '../../common/PathNavLink';
import {AddAddressProps} from '../../AppHouseListPage/types';
import {MatchProps} from '../types';
import {HouseType} from '../../types';
import {MY_ACCOUNT_PATHS} from './constants';
import AddressDropdown from './AddressDropdown';

interface SideBarProps {
  location: Location;
  match: MatchProps;
  houses: HouseType[] | null;
  selectedHouse: HouseType | null;
  userFullName?: string;
  customerGID?: number;
  addHouse: (customerGID: number, address: AddAddressProps) => void;
  setSelectedHouse: (data: HouseType) => void;
}

const SideBar = (props: SideBarProps) => {
  const {location, match, userFullName, customerGID, houses, setSelectedHouse, selectedHouse, addHouse} = props;
  const unsubscribedCode = getUnsubscribeCodeFromQuery(location.search) as string | null;

  const isMyAccount = useMemo(() => location.pathname.match(MY_ACCOUNT_PATHS), [location.pathname]);

  const menuItems = useMemo(() => {
    if (isMyAccount) {
      return getMyAccountMenuItems(match.url, unsubscribedCode);
    }
    return getMyProjectsMenuItems(match.url);
  }, [match, unsubscribedCode, isMyAccount]);

  const sideBarTitle = useMemo(() => {
    if (isMyAccount) {
      return (
        <>
          <ReactSVG className="Icon-Profile" src={profileIcon} />
          <p>My Account</p>
        </>
      );
    }
    return (
      <>
        <ReactSVG className="Icon-Home" src={homeIcon} />
        <p>My Projects</p>
      </>
    );
  }, [isMyAccount]);

  const menuHeader = useMemo(() => {
    if (isMyAccount) {
      return <li className="SideBar-Header">{userFullName}</li>;
    }

    return (
      <AddressDropdown
        addHouse={addHouse}
        customerGID={customerGID}
        houses={houses}
        selectedHouse={selectedHouse}
        setSelectedHouse={setSelectedHouse}
      />
    );
  }, [customerGID, isMyAccount, houses, selectedHouse, addHouse, setSelectedHouse, userFullName]);

  return (
    <div className="SideBar">
      <div className="SideBar-Title">{sideBarTitle}</div>
      <div className="card shadow soft-border">
        <ul className="siblings-list">
          {menuHeader}
          {menuItems.map((menuItem) => (
            <PathNavLink activeClassName="active-link" key={`app-menu-${menuItem.title}`} to={menuItem.path}>
              <li
                className={classNames('siblings-list-item', {
                  [menuItem.className]: menuItem.className,
                })}
              >
                <div className="menu-icon-wrapper">
                  <ReactSVG src={menuItem.iconSVG} />
                </div>
                <div className="siblings-list-item__wrapper">{menuItem.title}</div>
              </li>
            </PathNavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
