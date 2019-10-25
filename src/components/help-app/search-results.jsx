import React from 'react';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';

import HomeIcon from 'assets/icon-home-black.svg';
import './search-results.scss';
class SearchResults extends React.Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
  };

  renderResult({gid, title, short_memo: shortMemo, breadcrumb}) {
    return (
      <div className="search-result" key={`result-${gid}`}>
        <NavLink className="search-result__title" to={`/help/${gid}`}>
          {title}
          <div className="search-result__description">{shortMemo}</div>
        </NavLink>
        <div className="search-result__breadcrumb">
          <span className="breadcrumb-item">
            <NavLink to="/help"><img src={HomeIcon} /></NavLink>
          </span>
          {[...breadcrumb].reverse().slice(1).map(item => (
            <span className="breadcrumb-item" key={`result-${gid}-${item.gid}`}>
              <NavLink to={`/help/${item.gid}`}>{item.title}</NavLink>
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

export default SearchResults;