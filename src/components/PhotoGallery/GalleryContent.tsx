import React, {useMemo, useState} from 'react';
import find from 'lodash/find';

import {FencePhotoData, GatePhotoData, DrivewayPhotoData} from '../../data/photo-gallery';
import GalleryPartners, {Partners} from './GalleryPartners';
import GalleryPhotos from './GalleryPhotos';

import GalleryBreadcrumbs from './GalleryBreadcrumbs';
import GalleryHeader from './GalleryHeader';
import GalleryBannersList from './GalleryBannersList';
import GalleryTabs from './GalleryTabs';
import {fillCaptionsInPhotos} from './utils';
import GalleryModal from './GalleryModal';
import {PhotoGalleryProps} from '.';

const PRODUCTS = {
  FENCE: 'fence',
  GATE: 'gate',
  DRIVEWAY: 'driveway',
};

export type Photo = {
  caption?: string;
  title?: string;
  url: string;
  slug: string;
};

type Group = {
  groupName: string;
  groupSlug: string;
  groupPhotos: Photo[];
};

export type ProductCategory = {
  categoryName: string;
  categorySlug: string;
  categoryGroups?: Group[];
  categoryPhotos?: Photo[];
  partners?: Partners[];
};

const GalleryContent = ({match, history}: PhotoGalleryProps) => {
  const [modalImageIndex, setModalImageIndex] = useState<number | undefined>(undefined);

  const {productSlug, categorySlug, groupSlug} = match.params;

  const productGalleryName = useMemo(() => {
    const productGalleryNames = {
      [PRODUCTS.FENCE]: 'Fence Photos',
      [PRODUCTS.GATE]: 'Gate Photos',
      [PRODUCTS.DRIVEWAY]: 'Driveway Photos',
    };

    return productGalleryNames[productSlug];
  }, [productSlug]);

  const productData = useMemo(() => {
    const dataByProduct = {
      [PRODUCTS.FENCE]: FencePhotoData,
      [PRODUCTS.GATE]: GatePhotoData,
      [PRODUCTS.DRIVEWAY]: DrivewayPhotoData,
    };
    return dataByProduct[productSlug] || dataByProduct[PRODUCTS.FENCE];
  }, [productSlug]);

  const categoryData = useMemo(() => {
    const result = find(productData, {categorySlug});
    return result as ProductCategory;
  }, [productData, productSlug, categorySlug]);

  const breadcrumbGroups = useMemo(() => {
    const categoryGroups = categoryData.categoryGroups || [];

    return categoryGroups.map((group) => ({
      name: group.groupName,
      to: `/gallery/${productSlug}/${categorySlug}/${group.groupSlug}`,
      highlighted: groupSlug === group.groupSlug,
    }));
  }, [categoryData, productSlug, categorySlug, groupSlug]);

  const photos = useMemo(() => {
    const groupedBySlug = find(categoryData.categoryGroups, {groupSlug});

    if (groupedBySlug) {
      return fillCaptionsInPhotos(groupedBySlug.groupPhotos);
    }

    return categoryData.categoryPhotos || [];
  }, [categoryData, productSlug, categorySlug, groupSlug]);

  const updateLocationHash = (slug: string) => {
    const {pathname, search} = location;
    history.push(`${pathname}${search}#${slug}`);
  };

  const handlePhotoClick = (photoProps: Photo, index: number) => {
    updateLocationHash(photoProps.slug);
    setModalImageIndex(index);
  };

  const clearLocationHash = () => {
    const {pathname, search} = location;
    history.push(`${pathname}${search}`);
  };

  const handleModalClose = () => {
    clearLocationHash();
    setModalImageIndex(undefined);
  };

  const activeGroup = find(breadcrumbGroups, {highlighted: true});

  return (
    <div className="photo-gallery">
      <div className="wrapper-1180">
        <GalleryHeader />
        <h1 className="h2">
          {categoryData?.categoryName} {activeGroup?.name} {productGalleryName}
        </h1>
      </div>
      <GalleryTabs categorySlug={categorySlug} productData={productData} productSlug={productSlug} />
      <div className="wrapper-1180">
        {breadcrumbGroups.length > 1 && <GalleryBreadcrumbs category={categoryData} match={match} />}
        <GalleryPhotos onPhotoClick={handlePhotoClick} photos={photos} />
        <GalleryBannersList productSlug={productSlug} products={PRODUCTS} />
        {categoryData.partners && <GalleryPartners partners={[]} />}
        <GalleryModal
          handleModalClose={() => handleModalClose()}
          handleViewChange={(index) => updateLocationHash(photos[index].slug)}
          imageIndex={modalImageIndex}
          photos={photos}
        />
      </div>
    </div>
  );
};

export default GalleryContent;
