import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withRouter, NavLink} from 'react-router-dom';

import {Spinner} from '@ergeon/core-components';
import SearchField from 'components/help-app/search-field';
import SearchResults from 'components/help-app/search-results';
import {defaultCategories} from 'pages/help-landing-page';

import {getParameterByName} from 'libs/utils/utils';
import {getHelpNode, getHelpResults} from 'libs/api';

import HomeIcon from 'assets/icon-home-black.svg';
import './help-page.scss';
class HelpPage extends React.Component {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        nodeGid: PropTypes.string,
      }),
    }),
  };

  state = {
    loading: true,
    helpNode: {
      urn: null,
      breadcrumb: [],
      parent: {
        urn: null,
        title: null,
        children: defaultCategories,
      },
    },
    error: null,
    search: '',
    searchResults: null,
  };

  componentDidMount() {
    const nodeGid = this.props.match.params.nodeGid;
    const query = getParameterByName('q');

    if (nodeGid) {
      this.retrieveHelpNode(nodeGid);
    }

    if (query) {
      this.onSearch(query);
    }
  }

  componentDidUpdate(prevProps) {
    const nodeGid = this.props.match.params.nodeGid;
    const search = this.props.location.search;
    const prevNodeGid = prevProps.match.params.nodeGid;
    const prevSearch = prevProps.location.search;
    const query = getParameterByName('q');

    if (nodeGid !== prevNodeGid && nodeGid) {
      this.retrieveHelpNode(nodeGid);
    }

    if (query && prevSearch !== search) {
      this.onSearch(query);
    }
  }

  retrieveHelpNode(nodeUrn) {
    this.setState({loading: true, search: '', searchResults: null});

    getHelpNode(nodeUrn)
      .then(data => this.setState({loading: false, helpNode: data, error: null}))
      .catch(error => {
        console.error(error);
        this.setState({loading: false, error, helpNode: null});
      });
  }

  searchRedirect(value) {
    if (value) {
      this.props.history.push({
        pathname: '/help/search',
        search: `?q=${value}`,
      });
    }
  }

  redirectNode(gid) {
    this.props.history.push({
      pathname: `/help/${gid}`,
    });
  }

  onSearch(value) {
    const defaultHelpNode = {
      urn: null,
      breadcrumb: [],
      parent: {
        urn: null,
        title: null,
        children: defaultCategories,
      },
    };

    this.setState({
      loadingSearch: true,
      search: value,
    });

    getHelpResults(value)
      .then(results => this.setState({loadingSearch: false, searchResults: results.data, helpNode: defaultHelpNode}));
  }

  renderError() {
    const {error} = this.state;
    return (
      <div>
        Error: {error}
      </div>
    );
  }

  renderLoading(loading) {
    const classes = classNames({
      'loading': true,
      'loading--hidden': !loading,
    });

    return (
      <div className={classes}>
        <Spinner active={true} borderWidth={0.16} color="green" size={64}/>
      </div>
    );
  }

  renderSearchResults() {
    const {search, searchResults, loadingSearch} = this.state;
    const searchResultsNode = searchResults ? <SearchResults results={searchResults} /> : null;

    return (
      <div className="help-page__search-results">
        <h3 className="spacing after__is-12">Help Search Results</h3>
        <SearchField
          onChange={search => this.setState({search})}
          onSubmit={this.searchRedirect.bind(this)}
          value={search} />
        <div className="help-page__search-results-wrapper">
          {searchResultsNode}
          {this.renderLoading(loadingSearch)}
        </div>
      </div>
    );
  }

  renderNodeContent() {
    const {
      breadcrumb,
      title,
      short_memo: shortMemo,
      content,
    } = this.state.helpNode;

    const onContentClick = event => {
      if (event.target.nodeName === 'A') {
        const url = event.target.getAttribute('href');

        if (url[0] === '/') {
          event.preventDefault();
          event.stopPropagation();

          this.props.history.push({pathname: url});
        }
      }
    };

    /* eslint-disable react/no-danger */
    return (
      <div className="help-page__node">
        <div className="help-breadcrumb">
          <span className="help-breadcrumb__item">
            <NavLink className="help-breadcrumb__link" to="/help"><img src={HomeIcon} /></NavLink>
          </span>
          {[...breadcrumb].reverse().slice(1).map(
            ({title, gid}) => (
              <span className="help-breadcrumb__item" key={`header-breadcrumb-${gid}`}>
                <NavLink className="help-breadcrumb__link" to={`/help/${gid}`}>{title}</NavLink>
              </span>
            )
          )}
        </div>
        <h3 className="help-page__title">
          {title}
        </h3>
        <div className="help-page__subtitle">
          {shortMemo}
        </div>
        <div className="help-page__node-content" dangerouslySetInnerHTML={{__html: content}} onClick={onContentClick}>
        </div>
      </div>
    );
    /* eslint-enable react/no-danger */
  }

  renderSidebar() {
    const {
      helpNode: {
        gid: currentGid,
        parent,
      },
    } = this.state;

    let parentChildren = parent && parent.children || [];
    let parentTitle = parent && parent.title || 'All topics';
    let parentGid = parent && parent.gid || '';

    if (parentTitle === 'Home') {
      parentTitle = 'All topics';
      parentGid = '';
    }

    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <div className="sidebar__parent-title">
            <i className="icon-arrow-left" onClick={this.redirectNode.bind(this, parentGid)} />
            {parentTitle}
          </div>
          <ul className="siblings-list">
            {parentChildren.map(
              ({gid, title}) => (
                <NavLink key={`sidemenu-${gid}`} to={`/help/${gid}`}>
                  <li
                    className={classNames({
                      'siblings-list-item': true,
                      'active': currentGid === gid,
                    })}>
                    <div className="siblings-list-item__wrapper">
                      {title}
                    </div>
                    <i className="icon-arrow-right" />
                  </li>
                </NavLink>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const {helpNode, error, searchResults, loadingSearch} = this.state;
    const contentNode = (helpNode && !searchResults && !loadingSearch) ? this.renderNodeContent() : null;
    const sidebarNode = helpNode ? this.renderSidebar() : null;
    const errorNode = error ? this.renderError() : null;
    const searchNode = (!searchResults && !loadingSearch) ? (
      <SearchField onSubmit={this.searchRedirect.bind(this)}/>
    ) : null;
    const searchResultsNode = (searchResults || loadingSearch) ? this.renderSearchResults() : null;

    return (
      <div className="help-page">
        <div className="shadow-block">
          <div className="help-page__header wrapper-1180">
            <h2>Help & Customer Service</h2>
            <div className="help-page__header-search">
              {searchNode}
            </div>
          </div>
        </div>
        <div className="help-page__body wrapper-1180">
          <div className="help-page__content">
            {sidebarNode}
            {contentNode}
            {searchResultsNode}
          </div>
          {errorNode}
        </div>
      </div>
    );
  }
}

export default withRouter(HelpPage);