import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useRouteMatch} from 'react-router-dom';
import ReactMetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';

import {getNodes} from 'api/node';
import metaDictionary from 'data/meta-data.json';
import config, {PRODUCTION} from 'website/config';
import {helpNodePath} from 'routes/public';

/**
 * This component can optionally update title and meta-description
 * in the <head> every time the location is changed.
 * @param props
 */
const MetaTags = (props) => {
  // We are going to store meta in state to easily asynchronously update it.
  const [meta, setMeta] = useState(null);

  // React Router hooks below.
  const location = useLocation();
  const match = useRouteMatch(helpNodePath);

  // Get help node’s key if the URL is matching `helpNodePath`.
  const helpNodeKey = useMemo(() => match?.params?.nodeKey, [match]);

  /**
   * Get meta {title, description} from
   * - help node if the path matches help URL,
   * - meta-data.json dictionary of known meta variants.
   */
  useEffect(function retrieveMeta() {
    (async() => {
      if (helpNodeKey) {
        // Retrieve help meta-data.
        try {
          const {data: [helpNode]} = await getNodes([helpNodeKey]);
          const {title, short_memo: description} = helpNode;
          setMeta({
            title: `${title} | Help & Customer Service | Ergeon.com`,
            description,
          });
          return;
        } catch (error) {
          // Just warn Sentry in case of an error, do not interfere.
          console.error(error.message);
        }
      }
      // Fallback to meta-data.json.
      setMeta(metaDictionary[location.pathname] || null);
    })();
  }, [helpNodeKey, location.pathname]);

  /**
   * Log the meta to simplify debugging.
   */
  useEffect(function logMeta() {
    if (config.level !== PRODUCTION && meta) {
      console.log('META', JSON.stringify(meta, null, 2));
    }
  }, [meta]);

  return (
    <>
      {meta && (
        <ReactMetaTags>
          <title>{meta.title}</title>
          <meta content={meta.description} name="description" />
          <meta content={meta.description} property="og:description"/>
        </ReactMetaTags>
      )}
      {props.children}
    </>
  );
};
MetaTags.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MetaTags;
