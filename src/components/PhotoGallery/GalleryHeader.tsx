import React from 'react';

import {NavLink} from 'react-router-dom';

const GalleryHeader = () => (
  <span className="breadcrumbs">
    <NavLink to="/">
      <span className="icon home" />
    </NavLink>
    <ul>
      <li>
        <NavLink to="/gallery/">Photo gallery</NavLink>
      </li>
    </ul>
  </span>
);

export default GalleryHeader;
