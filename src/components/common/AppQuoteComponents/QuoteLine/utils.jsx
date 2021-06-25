import isEqual from 'lodash/isEqual';
import {getLabelFromIndex} from '@ergeon/draw-map';

/**
 * Returns matching quoteLine comparing vs itemName
 * @param {Array.<object>} quoteLines
 * @param {string} itemName
 */
export const getQuoteLineForCalcInputItem = (quoteLines, itemName) => {
  if (!itemName) {
    return undefined;
  }
  return quoteLines.find((quoteLine) => Boolean(quoteLine.label) && isEqual(quoteLine.label, itemName));
};

/**
 * Returns label or retrieves one using index with getLabelFromIndex func
 * @param {number} index
 * @param {string} label
 */
export const indexLabel = (index, label) => {
  return label ? label : getLabelFromIndex(index);
};

/**
 * Checks for isInstallerPreview and catalog
 * @param {boolean} isInstallerPreview
 * @param {object} catalog
 */
export const isAllowedUnitDisplay = (isInstallerPreview, catalog) => {
  if (!isInstallerPreview || !catalog) {
    return true;
  }
  return catalog.type.allows_unit_display;
};
