import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import HelpSearchField from '../common/HelpSearchField';
import helpDefaultCategories from '../common/helpDefaultCategories';

import './index.scss';

class HelpLandingPage extends React.Component {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  state = {
    categories: helpDefaultCategories,
  };

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

  render() {
    const {categories} = this.state;

    return (
      <div className="help-landing-page">
        <div className="shadow-block">
          <div className="help-landing-page__header wrapper-1180">
            <div>
              <h2>Help & Customer Service</h2>
              <div className="subheader h2 spacing before__is-6">
                Feel free to <b>call us</b> if you don&apos;t find your answer here
              </div>
              <div className="spacing before__is-24 search-field-container">
                <HelpSearchField onSubmit={this.searchRedirect.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className="help-landing-page__body wrapper-1180">
          <div className="help-landing-page__categories">
            {categories.map(category => (
              <NavLink key={category.gid} to={`/help/${category.gid}`}>
                <div
                  className="help-landing-page__category">
                  <img className="category-icon" src={category.icon} />
                  <span className="additional-header h2">{category.title}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default HelpLandingPage;
