import React from 'react';
import PropTypes from 'prop-types';
import SearchField from 'components/help-app/search-field';
import {NavLink} from 'react-router-dom';

import IconErgeon from 'assets/icon-ergeon.svg';
import IconDriveway from 'assets/icon-driveway-101.svg';
import IconFence from 'assets/icon-fence-101.svg';
import IconService from 'assets/icon-service.svg';
import IconPricing from 'assets/icon-pricing.svg';

export const defaultCategories = [
  {
    title: 'About Ergeon',
    icon: IconErgeon,
    gid: '7oi863xrO2px23Xp',
  },
  {
    title: 'Driveways',
    icon: IconDriveway,
    gid: '7oiH7vpoKHwRogjj',
  },
  {
    title: 'Fences',
    icon: IconFence,
    gid: '7oiKY-I_pEYrl2WL',
  },
  {
    title: 'Service Policies',
    icon: IconService,
    gid: '7oiLA3t8dSrhF267',
  },
  {
    title: 'Pricing & Payment',
    icon: IconPricing,
    gid: '7oiLRFt5WZULKcaG',
  },
];

import './help-landing-page.scss';
class HelpLandingPage extends React.Component {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  state = {
    categories: defaultCategories,
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
              <div className="subtext">Feel free to <b>call us</b> if you don&apos;t find your answer here</div>
              <div className="spacing before__is-24 width-restricted to-280">
                <SearchField onSubmit={this.searchRedirect.bind(this)} />
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
