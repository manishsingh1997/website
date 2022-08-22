import React from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';

import NotFoundPage from '../components/NotFoundPage';
import AppCityPage from '../containers/AppCityPage';
import citiesMinData from '../data/cities-min-data.json';
import citiesRedirectsData from '../data/cities-neighboring-redirects-data.json';

const Cities = ({match, location}) => (
  <Switch>
    {citiesMinData.map(({slug}) => (
      <Route component={AppCityPage} exact key={slug} path={`${match.url}/${slug}`} />
    ))}
    {keys(citiesRedirectsData).map(slug => (
      <Route exact key={slug} path={`${match.url}/${slug}`}>
        <Redirect to={`${match.url}/${citiesRedirectsData[slug]}${location.search}`} />
      </Route>
    ))}
    <Route component={NotFoundPage} exact path="*" />
  </Switch>
);

Cities.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Cities;
