import React, {useMemo} from 'react';

import {useLocation} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';
import profileIcon from '@ergeon/core-components/src/assets/icon-profile.svg';
import homeIcon from '@ergeon/core-components/src/assets/icon-home-black.svg';

import {getSingularLevelFromPath} from './utils';
import {MY_ACCOUNT_PATHS, MY_PROJECTS_PATHS} from './constants';

import './BreadCrumbs.scss';

const BreadCrumbs = () => {
  const location = useLocation();

  const pathname = useMemo(() => location.pathname, [location]);

  const isMyAccount = useMemo(() => pathname.match(MY_ACCOUNT_PATHS), [pathname]);
  const isMyProjects = useMemo(() => pathname.match(MY_PROJECTS_PATHS), [pathname]);

  const icon = useMemo(() => {
    return isMyAccount ? (
      <ReactSVG className="Icon-Profile" src={profileIcon} />
    ) : (
      <ReactSVG className="Icon-Home" src={homeIcon} />
    );
  }, [isMyAccount]);

  const firstLevel = useMemo(() => {
    return isMyAccount ? isMyAccount : isMyProjects;
  }, [isMyAccount, isMyProjects]);

  const secondLevel = useMemo(() => {
    const secLevel = getSingularLevelFromPath(pathname, 'orders') || getSingularLevelFromPath(pathname, 'quotes');
    return secLevel;
  }, [pathname]);

  const firstLevelClass = useMemo(() => {
    return classNames({'is-active': !secondLevel});
  }, [secondLevel]);

  return (
    <div className="CustomerApp-BreadCrumbs">
      {icon}
      <p className="is-Separator">/</p>
      <p className={firstLevelClass}>{firstLevel}</p>
      {secondLevel && (
        <>
          <p className="is-Separator">/</p>
          <p className="is-Active">{secondLevel}</p>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
