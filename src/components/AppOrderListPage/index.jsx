import React from 'react';
import PropTypes from 'prop-types';

class AppOrderListPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const {auth} = this.props;

    return (
      <div>
        <h3>This is just a stub, not implemented yet</h3>
        <div>Current user is: {auth.user ? auth.user.full_name: 'Unknown'}</div>
      </div>
    );
  }
}

export default AppOrderListPage;
