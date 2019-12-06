import React from 'react';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';

import HomeIcon from 'assets/icon-home-black.svg';
import './HelpSearchResults.scss';

class HelpSearchResults extends React.Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
  };

  renderResult({nodeId, title, short_memo: shortMemo, breadcrumb}) {
    return (
      <div className="search-result" key={`result-${nodeId}`}>
        <NavLink className="search-result__title" to={`/help/${nodeId}`}>
          {title}
          <div className="search-result__description">{shortMemo}</div>
        </NavLink>
        <div className="search-result__breadcrumb">
          <span className="breadcrumb-item">
            <NavLink to="/help"><img src={HomeIcon} /></NavLink>
          </span>
          {[...breadcrumb].reverse().slice(1).map(item => (
            <span className="breadcrumb-item" key={`result-${nodeId}-${item.nodeId}`}>
              <NavLink to={`/help/${item.nodeId}`}>{item.title}</NavLink>
            </span>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const {results} = this.props;
    return (
      <div className="search-results">
        {results.map(this.renderResult.bind(this))}
      </div>
    );
  }
}

export default HelpSearchResults;
