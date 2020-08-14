import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {NavLink} from 'react-router-dom';

/**
 * Apply active className to the page ignoring GET query parameters.
 * Original NavLink require full URL to match, including GET query parameters.
 * More details here: https://bit.ly/2DYtPP2
 */
const PathNavLink = props => (
  <NavLink
    isActive={(_, {pathname}) => {
      const toPathname = queryString.parseUrl(props.to).url;
      return pathname === toPathname;
    }}
    {...props}/>
);

PathNavLink.propTypes = {
  activeClassName: PropTypes.string,
  to: PropTypes.string,
};

export default PathNavLink;
