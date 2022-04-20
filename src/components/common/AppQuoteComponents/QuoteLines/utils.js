import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

export const isQuoteLineOfMapKinds = (quoteLine, types) => {
  const catalog = quoteLine['catalog'];
  const quoteType = catalog && catalog['type'] && catalog['type']['map_kind'];
  return types.some(type => type === quoteType);
};

const getQuoteLineByItemName = (itemName, quote) => {
  return quote['quote_lines'].find((quoteLine) =>
    Boolean(quoteLine.label) && isEqual(quoteLine.label, itemName)
  );
};

export const getTagsForQuoteLine = (itemName, quote) => {
  const quoteLine = getQuoteLineByItemName(itemName, quote);
  return get(quoteLine, ['config', 'tags']);
};

export const getBuildSpecsForQuoteLine = (itemName, quote) => {
  const quoteLine = getQuoteLineByItemName(itemName, quote);
  const buildSpecsData = pick(quoteLine, ['is_build_spec_available', 'config']);
  return {
    isBuildSpecAvailable: Boolean(buildSpecsData.is_build_spec_available),
    config: buildSpecsData.config,
  };
};

export const getImagesForQuoteLine = (itemName, quote) => {
  const quoteLine = getQuoteLineByItemName(itemName, quote);
  return get(quoteLine, ['mediafile_list', 'mediafiles']);
};
