import React from 'react';

import {GALLERY_BANNERS} from '../../data/gallery-banners-data';

import GalleryBanner from './GalleryBanner';
import GalleryHeader from './GalleryHeader';

const GalleryPreview = () => (
  <div className="photo-gallery">
    <div className="wrapper-1180">
      <GalleryHeader />
      <h1 className="h2">Photo gallery</h1>
    </div>
    <div className="header-border spacing after__is-24"></div>
    <div className="wrapper-1180">
      <div className="cards two-columns">
        {[GALLERY_BANNERS.GRASS_BANNER, GALLERY_BANNERS.FENCE_BANNER, GALLERY_BANNERS.GATE_BANNER].map(
          (banner, index) => (
            <GalleryBanner key={index} {...banner} />
          )
        )}
      </div>
    </div>
  </div>
);

export default GalleryPreview;
