import React, {ReactNode} from 'react';
import queryString from 'query-string';
import {NavLink} from 'react-router-dom';

type PathNavLinkProps = {
  to: string;
  activeClassName: string;
  children: ReactNode;
};

/**
 * Apply active className to the page ignoring GET query parameters.
 * Original NavLink require full URL to match, including GET query parameters.
 * More details here: https://bit.ly/2DYtPP2
 */
const PathNavLink = (props: PathNavLinkProps) => (
  <NavLink
    isActive={(_, {pathname}) => {
      const toPathname = queryString.parseUrl(props.to).url;
      return pathname === toPathname;
    }}
    {...props}
  />
);

export default PathNavLink;
