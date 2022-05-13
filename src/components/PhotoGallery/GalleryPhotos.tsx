import React, {useCallback, useRef} from 'react';
import Masonry from 'react-masonry-component';
import isEmpty from 'lodash/isEmpty';
import {ImageCard} from '@ergeon/core-components';
import {Photo} from './GalleryContent';

type GalleryPhotosProps = {
  photos: Photo[];
  onPhotoClick: (photo: Photo, index: number) => void;
};

const GalleryPhotos = ({photos, onPhotoClick}: GalleryPhotosProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const masonryRef = useRef<any>();

  const layoutImages = () => {
    if (masonryRef?.current?.masonry) {
      setTimeout(() => {
        masonryRef?.current?.masonry?.layout();
      });
    }
  };

  const handlePhotoClick = useCallback(
    (photoProps, index) => {
      return onPhotoClick(photoProps, index);
    },
    [onPhotoClick]
  );

  return (
    <Masonry className="photo-gallery__masonry" ref={masonryRef}>
      {!isEmpty(photos) &&
        photos.map((photoProps, index) => (
          <div
            className="photo-gallery__masonry-card"
            gallery-link-id={photoProps.slug}
            key={photoProps.slug}
            onClick={() => handlePhotoClick(photoProps, index)}
          >
            <ImageCard onImageLoaded={layoutImages} {...photoProps} />
          </div>
        ))}
    </Masonry>
  );
};

export default GalleryPhotos;
