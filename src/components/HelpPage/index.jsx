import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withRouter, NavLink} from 'react-router-dom';

import {Notification, Spinner} from '@ergeon/core-components';
import helpDefaultCategories from 'data/help-categories';
import HelpSearchField from '../common/HelpSearchField';
import HelpSearchResults from './HelpSearchResults';

import {getParameterByName} from 'utils/utils';
import {getHelpNode, getHelpResults} from 'api/help';
import {parseAPIError} from 'utils/api';

import HomeIcon from 'assets/icon-home-black.svg';

import './index.scss';

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
        nodeId: PropTypes.string,
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
        children: helpDefaultCategories,
      },
    },
    error: null,
    search: '',
    searchResults: null,
    expandedSidebar: false,
  };

  componentDidMount() {
    const nodeId = this.props.match.params.nodeId;
    const query = getParameterByName('q');

    if (nodeId) {
      this.retrieveHelpNode(nodeId);
    }

    if (query) {
      this.onSearch(query);
    }
  }

  async componentDidUpdate(prevProps) {
    const nodeId = this.props.match.params.nodeId;
    const search = this.props.location.search;
    const prevNodeId = prevProps.match.params.nodeId;
    const prevSearch = prevProps.location.search;
    const query = getParameterByName('q');

    if (nodeId !== prevNodeId && nodeId) {
      await this.retrieveHelpNode(nodeId);
    }

    if (query && prevSearch !== search) {
      this.onSearch(query);
    }
  }

  async retrieveHelpNode(nodeUrn) {
    this.setState({loading: true, search: '', searchResults: null});

    try {
      const data = await getHelpNode(nodeUrn);
      this.setState({loading: false, helpNode: data, error: null});
    } catch (apiError) {
      console.warn(apiError);
      this.setState({
        loading: false,
        error: parseAPIError(apiError),
        helpNode: null,
      });
    }
  }

  searchRedirect(value) {
    if (value) {
      this.props.history.push({
        pathname: '/help/search',
        search: `?q=${value}`,
      });
    }
  }

  redirectNode(nodeId) {
    this.props.history.push({
      pathname: `/help/${nodeId}`,
    });
  }

  onSearch(value) {
    const defaultHelpNode = {
      urn: null,
      breadcrumb: [],
      parent: {
        urn: null,
        title: null,
        children: helpDefaultCategories,
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
    const errorMessage = Object.values(error.data).join('\n');
    return (
      <Notification
        mode="embed"
        type="Error">
        There was an error trying to retrieve help page.<br />
        {errorMessage}
      </Notification>
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
    const searchResultsNode = searchResults ? <HelpSearchResults results={searchResults} /> : null;

    return (
      <div className="help-page__search-results">
        <h3 className="spacing after__is-12">Help Search Results</h3>
        <HelpSearchField
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

        if (!url) {
          console.warn('Help content has a link without href attribute');
          return;
        }

        if (url[0] === '/') {
          event.preventDefault();
          event.stopPropagation();

          this.props.history.push({pathname: url});
          window.scrollTo(0, 0);
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
            ({title, nodeId}) => (
              <span className="help-breadcrumb__item" key={`header-breadcrumb-${nodeId}`}>
                <NavLink className="help-breadcrumb__link" to={`/help/${nodeId}`}>{title}</NavLink>
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
        nodeId: currentNodeId,
        parent,
      },
      expandedSidebar,
    } = this.state;

    let parentChildren = parent && parent.children || [];
    let parentTitle = parent && parent.title || 'All topics';
    let parentNodeId = parent && parent.nodeId || '';

    if (parentTitle === 'Home') {
      parentTitle = 'All topics';
      parentNodeId = '';
    }

    const classes = {
      'sidebar': true,
      'sidebar--expanded': expandedSidebar,
    };

    return (
      <div className={classNames(classes)}>
        <div className="sidebar__menu">
          <div className="sidebar__parent-title">
            <i className="icon-arrow-left" onClick={this.redirectNode.bind(this, parentNodeId)} />
            {parentTitle}
            <i className="icon-arrow-down" onClick={() => this.setState({expandedSidebar: !expandedSidebar})} />
          </div>
          <ul className="siblings-list">
            {parentChildren.map(
              ({nodeId, title}) => (
                <NavLink key={`sidemenu-${nodeId}`} to={`/help/${nodeId}`}>
                  <li
                    className={classNames({
                      'siblings-list-item': true,
                      'active': currentNodeId === nodeId,
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
      <HelpSearchField onSubmit={this.searchRedirect.bind(this)}/>
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
