import bent from 'bent';

/**
 * This file includes functions used for sitemaps generation.
 */

const getJSON = bent('json');

/*
  The following method asks for all the help nodes to public admin
  and returns and url for each of them.
  Each of the urls will looks like https://www.ergeon.com/help/201900019
 */
export const getHelpNodesURLs = async function() {
  try {
    const url = `${process.env.API_HOST}/api/help/node/?domain=1`;
    const result = await getJSON(url);
    if (result && result.length) {
      return result.map(result => `${process.env.HOME_PAGE}/help/${result.node_key}`);
    }
  } catch (e) {
    console.log(`Error while getting node ids ${e}`);
  }
};
