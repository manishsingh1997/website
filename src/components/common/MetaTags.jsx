import React, {useCallback} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compact from 'lodash/compact';
import get from 'lodash/get';
import {useLocation} from 'react-router-dom';
import {MetaTags} from '@ergeon/core-components';

import metaDictionary from '../../data/meta-data.json';
import {logDev} from '../../utils/log';

/**
 * This component can optionally update title and meta-description
 * in the <head> every time the location is changed.
 */
const MetaTagsConnected = ({auth = {}}) => {
  const location = useLocation();

  const {user} = auth;

  /**
   * Get meta-data
   * 1. By matching the path with the keys from `data/meta-data.json`,
   * 2. By retrieving help meta-data if `helpNodeKey` is in the path,
   * 3. Private area meta-data if the path starts with `/app`.
   */
  const getMeta = useCallback(
    async (path) => {
      let meta = {};

      const isPrivateArea = /^\/app/i.test(path);

      if (metaDictionary[path]) {
        meta = {...meta, ...metaDictionary[path]};
      } else if (isPrivateArea) {
        const getPathAfterUserGIDRegex = new RegExp(/^\/app\/[\w\-]{16}\/(.+)/i);
        const subPath = get(path.match(getPathAfterUserGIDRegex), 1);
        let customerMeta = subPath ? metaDictionary['/app'][subPath] : {};
        customerMeta = {
          title: compact([user?.full_name || 'Customer', customerMeta?.title]).join(' | '),
          description: '',
        };
        meta = {...meta, ...customerMeta};
      } else {
        return null; // no meta
      }

      // Either noindex or canonical should present
      if (isPrivateArea) {
        meta.noindex = true; // hide internal /app/**/* URLs from robots
      } else {
        meta.canonical = `${process.env.HOME_PAGE}${path !== '/' ? path : ''}`;
      }

      // Log the meta to simplify debugging.
      logDev('META', JSON.stringify(meta, null, 2));

      return meta;
    },
    [user, location.pathname]
  );

  return <MetaTags {...{getMeta}} />;
};
MetaTagsConnected.propTypes = {
  auth: PropTypes.object,
};

export default connect(
  ({auth}) => ({auth}),
  () => ({})
)(MetaTagsConnected);
