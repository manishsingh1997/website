import React, {useMemo} from 'react';
import isEmpty from 'lodash/isEmpty';
import {ImageGallery, SwipeGallery} from '@ergeon/core-components';
import {fillUrlInImages} from './utils';
import {Image} from './types';

const Gallery = ({images}: {images?: Image[]}) => {
  const galleryImages = useMemo(() => fillUrlInImages(images), [images]);

  if (isEmpty(galleryImages)) {
    return null;
  }

  return (
    <>
      <div className="desktop-length">
        <ImageGallery height={150} images={galleryImages} width={150} />
      </div>
      <div className="mobile-length">
        <SwipeGallery images={galleryImages} />
      </div>
    </>
  );
};

export default Gallery;
