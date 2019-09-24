import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import {Footer, TopPanel, NavLinkContext} from '@ergeon/core-components';

class Layout extends React.Component {
    static propTypes = {
      children: PropTypes.node,
    };

    render() {
      return (
        <div>
          <NavLinkContext.Provider value={NavLink}>
            <TopPanel ergeonUrl="/" />
            <div>{this.props.children}</div>
            <Footer ergeonUrl="/" />
          </NavLinkContext.Provider>
        </div>
      );
    }
}

export default Layout;