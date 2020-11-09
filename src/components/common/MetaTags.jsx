import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useRouteMatch} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {getNodes} from 'api/node';
import metaDictionary from 'data/meta-data.json';
import config from 'website/config';
import {helpNodePath} from 'routes/public';
import {logDev} from 'utils/log';

/**
 * This component can optionally update title and meta-description
 * in the <head> every time the location is changed.
 */
const MetaTags = () => {
  // We are going to store meta in state to easily asynchronously update it.
  const [meta, setMeta] = useState(null);

  // Re-assign meta. Used as a callback.
  const refreshMeta = useCallback(() => {
    setMeta(meta && {...meta});
  }, [meta]);

  // React Router hooks below.
  const location = useLocation();
  const match = useRouteMatch(helpNodePath);

  // Remove a ”/” from the end of the pathname.
  const path = useMemo(() => location.pathname.replace(/^(.+)\/$/, '$1'), [location.pathname]);

  // Canonical URL of the page. See https://moz.com/learn/seo/canonicalization for more info.
  const canonical = useMemo(() => {
    const result = `${config.publicWebsite}${path !== '/' ? path : ''}`;
    logDev('CANONICAL', result);
    return result;
  }, [path]);

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
      setMeta(metaDictionary[path] || null);
    })();
  }, [helpNodeKey, path]);

  /**
   * Force meta update fixes title re-writes bug on tab activated,
   * see https://github.com/nfl/react-helmet/issues/462.
   */
  useEffect(function refreshMetaOnTabActive() {
    window.addEventListener('focus', refreshMeta);
    return () => {
      window.removeEventListener('focus', refreshMeta);
    };
  }, [refreshMeta]);

  /**
   * Log the meta to simplify debugging.
   */
  useEffect(function logMeta() {
    logDev('META', JSON.stringify(meta, null, 2));
  }, [meta]);

  return meta ? (
    <Helmet>
      <title key={Math.random()}>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link href={canonical} rel="canonical" />
    </Helmet>
  ) :
    // No metadata exist for this page.
    null;
};

export default MetaTags;
