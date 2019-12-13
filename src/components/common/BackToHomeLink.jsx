import React from 'react';
import {Link} from 'react-router-dom';

class BackToHomeLink extends React.Component {

  render() {
    return (
      <div className="center small-text spacing before__is-24">
        <Link to="/">Back to home page</Link>
      </div>
    );
  }
}

export default BackToHomeLink;
