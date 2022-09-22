import React from 'react';

import { GALLERY_BANNERS } from '../../data/gallery-banners-data';

import GalleryBanner from './GalleryBanner';

type GalleryBannersListProps = {
  productSlug: string;
  products: { [key: string]: string };
};

const GalleryBannersList = ({ productSlug, products }: GalleryBannersListProps) => {
  const banners = {
    [products.FENCE]: [GALLERY_BANNERS.GATE_BANNER],
    [products.GATE]: [GALLERY_BANNERS.FENCE_BANNER],
    [products.GRASS]: [GALLERY_BANNERS.GRASS_BANNER],
  }[productSlug];

  return (
    <div className="cards two-columns spacing before__is-64">
      {banners.map((banner, index) => {
        if (banner.header === 'Artificial Grass') return null;
        return (
          <GalleryBanner key={index} {...banner} />
        )
      })}
    </div>
  );
};

export default GalleryBannersList;
