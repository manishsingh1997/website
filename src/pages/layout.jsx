import React from 'react';
import PropTypes from 'prop-types';

import {Footer, TopPanel} from '@ergeon/core-components';

class Layout extends React.Component {
    static propTypes = {
      children: PropTypes.node,
    };

    render() {
      return (
        <div>
          <TopPanel />
          <div>{this.props.children}</div>
          <Footer />
        </div>
      );
    }
}

export default Layout;