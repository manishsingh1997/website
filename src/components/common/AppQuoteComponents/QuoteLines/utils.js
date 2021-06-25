import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

export const isQuoteLineOfMapKinds = (quoteLine, types) => {
  const catalog = quoteLine['catalog'];
  const quoteType = catalog && catalog['type'] && catalog['type']['map_kind'];
  return types.some(type => type === quoteType);
};

export const getTagsForQuoteLine = (itemName, quote) => {
  const quoteLine = quote['quote_lines'].find((quoteLine) =>
    Boolean(quoteLine.label) && isEqual(quoteLine.label, itemName)
  );
  return get(quoteLine, quoteLine?.config, quoteLine?.config?.tags);
};

export const getImagesForQuoteLine = (itemName, quote) => {
  const quoteLine = quote['quote_lines'].find((quoteLine) =>
    Boolean(quoteLine.label) && isEqual(quoteLine.label, itemName)
  );
  return get(quoteLine, quoteLine?.mediafile_list, quoteLine?.mediafile_list?.mediafiles);
};
