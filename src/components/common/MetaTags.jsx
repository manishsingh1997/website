import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useRouteMatch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import isNil from 'lodash/isNil';

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

  // Checks that path starts with `startPath`
  const pathStartsWith = useCallback(startPath => new RegExp(`^${startPath}`).test(path), [path]);

  // Hide a page from search robots.
  const notIndexed = useMemo(() => {
    if (pathStartsWith('/app')) {
      // All internal /app/**/* URLs should be hidden from robots.
      return true;
    }
    return false;
  }, [pathStartsWith]);

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
          if (!isNil(helpNode)) {
            const {title, short_memo: description} = helpNode;
            setMeta({
              title: `${title} | Help & Customer Service | Ergeon.com`,
              description,
            });
          }
          return;
        } catch (error) {
          // Just warn Sentry in case of an error, do not interfere.
          console.error(error.message);
        }
      }

      if (metaDictionary[path]) {
        setMeta(metaDictionary[path]); // Fallback to meta-data.json.
      } else if (pathStartsWith('/app')) {
        setMeta({
          title: 'Private Cabinet',
          description: '', // to reset the previous state
        });
      }
    })();
  }, [helpNodeKey, path, pathStartsWith]);

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

  // There is no point in adding meta to the pages disallowed for indexing.
  if (notIndexed) {
    return (
      <Helmet>
        {meta?.title && <title key={meta.title}>{meta.title}</title>}
        {meta?.description && <meta content={meta.description} name="description" />}
        <meta content="noindex" name="robots" />
      </Helmet>
    );
  }

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
