import React from 'react';

import {Button} from '@ergeon/core-components';
import {Link} from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <div className="center">
      <h4>Not signed in</h4>
      <p>Sorry, you are not signed it yet</p>
      <Link to="/app/sign-in">
        <Button className="spacing before__is-12" size="large" type="submit">
          Sign In
        </Button>
      </Link>
    </div>
  )
}

export default NotLoggedIn;
