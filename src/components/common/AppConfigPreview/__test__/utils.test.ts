import '@testing-library/jest-dom';

import {fillUrlInImages} from '../utils';

describe('AppConfigPreview utils', () => {
  it('should fillUrlInImages fill url in images object', () => {
    const img = {
      id: '1',
      type: 'image',
      title: 'My image',
      file: 'image.png',
    };
    expect(fillUrlInImages([img])).toEqual([{...img, url: img.file}]);
  });
  it('should fillUrlInImages return empty array if image is empty', () => {
    expect(fillUrlInImages([])).toEqual([]);
  });
});
