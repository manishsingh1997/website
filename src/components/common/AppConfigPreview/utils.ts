import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {calcUtils} from '@ergeon/3d-lib';
import isEqual from 'lodash/isEqual';

import {Image} from './types';

export const getPreviewImage = async (schemaCodeUrl: string) => {
  const USE_CACHE = true;
  const DEFAULT_PREVIEW_WIDTH = 300;
  const DEFAULT_PREVIEW_HEIGHT = 300;

  try {
    return await calcUtils.getPreviewImage({
      height: DEFAULT_PREVIEW_HEIGHT,
      schemaCodeUrl,
      useCache: USE_CACHE,
      width: DEFAULT_PREVIEW_WIDTH,
    });
  } catch {
    return previewPlaceholderIcon;
  }
};

export const isPlaceholderImage = (previewImage?: string) => {
  return isEqual(previewImage, previewPlaceholderIcon) || isEqual(previewImage, noPreviewIcon);
};

export const fillUrlInImages = (images?: Image[]): Image[] => {
  if (!images) return [];
  images.forEach((elem: Image) => (elem.url = elem.file));
  return images;
};
