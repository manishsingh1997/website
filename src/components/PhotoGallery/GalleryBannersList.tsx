import React from 'react';

import {GALLERY_BANNERS} from '../../data/gallery-banners-data';

import GalleryBanner from './GalleryBanner';

type GalleryBannersListProps = {
  productSlug: string;
  products: {[key: string]: string};
};

const GalleryBannersList = ({productSlug, products}: GalleryBannersListProps) => {
  const banners = {
    [products.FENCE]: [GALLERY_BANNERS.GATE_BANNER],
    [products.GATE]: [GALLERY_BANNERS.FENCE_BANNER],
  }[productSlug];

  return (
    <div className="cards two-columns spacing before__is-64">
      {banners.map((banner, index) => (
        <GalleryBanner key={index} {...banner} />
      ))}
    </div>
  );
};

export default GalleryBannersList;
