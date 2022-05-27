import React, {useMemo} from 'react';
import {ReactSVG} from 'react-svg';
import {getMenuItems} from '../../../data/customer-app';
import {getUnsubscribeCodeFromQuery} from '../../../utils/app-notifications';
import PathNavLink from '../../common/PathNavLink';
import {MatchProps} from '../types';

interface SideBarProps {
  location: Location;
  match: MatchProps;
}

const SideBar = (props: SideBarProps) => {
  const {location, match} = props;
  const unsubscribedCode = getUnsubscribeCodeFromQuery(location.search) as string | null;
  const menuItems = useMemo(() => getMenuItems(match.url, unsubscribedCode), [match, unsubscribedCode]);

  return (
    <div>
      <ul className="siblings-list">
        {menuItems.map((menuItem) => (
          <PathNavLink activeClassName="active-link" key={`app-menu-${menuItem.title}`} to={menuItem.path}>
            <li className="siblings-list-item">
              <div className="menu-icon-wrapper">
                <ReactSVG src={menuItem.iconSVG} />
              </div>
              <div className="siblings-list-item__wrapper">{menuItem.title}</div>
            </li>
          </PathNavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;