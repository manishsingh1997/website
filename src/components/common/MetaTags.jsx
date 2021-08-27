import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';
import compact from 'lodash/compact';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import {MetaTags} from '@ergeon/core-components';

import {getNodes} from '../../api/node';
import metaDictionary from '../../data/meta-data.json';
import config from '../../website/config';
import {helpNodePath} from '../../routes/public';
import {logDev} from '../../utils/log';

/**
 * This component can optionally update title and meta-description
 * in the <head> every time the location is changed.
 */
const MetaTagsConnected = ({auth = {}}) => {
  const {user} = auth;

  const match = useRouteMatch(helpNodePath);

  // Get help node’s key if the URL is matching `helpNodePath`.
  const helpNodeKey = useMemo(() => match?.params?.nodeKey, [match]);

  /**
   * Get meta-data
   * 1. By matching the path with the keys from `data/meta-data.json`,
   * 2. By retrieving help meta-data if `helpNodeKey` is in the path,
   * 3. Private area meta-data if the path starts with `/app`.
   */
  const getMeta = useCallback(async(path) => {
    let meta = {};

    const isPrivateArea = (/^\/app/i).test(path);

    if (metaDictionary[path]) {
      meta = {...meta, ...metaDictionary[path]};
    } else if (helpNodeKey) {
      let helpMeta = metaDictionary['/help'];
      try {
        // Retrieve help meta-data
        const {data: [helpNode]} = await getNodes([helpNodeKey]);
        if (!isNil(helpNode)) {
          helpMeta = {
            title: `${helpNode.title} | ${helpMeta.title}`,
            description: helpNode.short_memo,
          };
        }
      } catch (error) {
        // Just warn Sentry in case of an error, do not interfere
        console.error(error.message);
      } finally {
        meta = {...meta, ...helpMeta};
      }
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
      meta.canonical = `${config.publicWebsite}${path !== '/' ? path : ''}`;
    }

    // Log the meta to simplify debugging.
    logDev('META', JSON.stringify(meta, null, 2));

    return meta;
  }, [helpNodeKey, user]);

  return <MetaTags {...{getMeta}} />;
};
MetaTagsConnected.propTypes = {
  auth: PropTypes.object,
};

export default connect(({auth}) => ({auth}), () => ({}))(MetaTagsConnected);
