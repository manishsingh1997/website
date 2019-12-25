import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './SingleCard.scss';

class SingleCard extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  };

  render() {

    const {className, content} = this.props;

    return (
      <div className={`single-card-page ${className ? className : ''}`}>
        <div className="single-card-page__content">
          {content}
        </div>
        <div className="center small-text spacing before__is-24">
          <Link to="/">Back to home page</Link>
        </div>
      </div>
    );
  }
}

export default SingleCard;