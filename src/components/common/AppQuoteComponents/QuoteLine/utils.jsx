import {getLabelFromIndex} from '@ergeon/draw-map';

/**
 * Returns label or retrieves one using index with getLabelFromIndex func
 * @param {number} index
 * @param {string} label
 */
export const indexLabel = (index, label) => {
  return label ? label : getLabelFromIndex(index);
};

/**
 * Checks for isInstallerPreview and catalog type
 * @param {boolean} isInstallerPreview
 * @param {object} catalogType
 */
export const isAllowedUnitDisplay = (isInstallerPreview, catalogType) => {
  if (!isInstallerPreview || !catalogType) {
    return true;
  }
  return catalogType.allows_unit_display;
};
