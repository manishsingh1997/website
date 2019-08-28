import React from 'react';
import PropTypes from 'prop-types';

class Layout extends React.Component {
    static propTypes = {
      children: PropTypes.node,
    };

    render() {
      return (
        <div>
          <div>Header</div>
          <div>{this.props.children}</div>
          <div>Footer</div>
        </div>
      );
    }
}

export default Layout;