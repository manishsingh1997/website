import React, {useMemo} from 'react';

import {Breadcrumb} from '@ergeon/core-components';

import {PhotoGalleryProps} from './';

import {ProductCategory} from './GalleryContent';

type GalleryBreadcrumbsProps = {
  category: ProductCategory;
} & Pick<PhotoGalleryProps, 'match'>;

const GalleryBreadcrumbs = ({match, category}: GalleryBreadcrumbsProps) => {
  const breadcrumbGroups = useMemo(() => {
    const {productSlug, categorySlug, groupSlug} = match.params;

    const categoryGroups = category.categoryGroups || [];

    return categoryGroups.map((group) => ({
      name: group.groupName,
      to: `/gallery/${productSlug}/${categorySlug}/${group.groupSlug}`,
      highlighted: groupSlug === group.groupSlug,
    }));
  }, [match, category]);

  return (
    <div className="photo-gallery__groups spacing after__is-24">
      <Breadcrumb items={[breadcrumbGroups]} secondary />
    </div>
  );
};

export default GalleryBreadcrumbs;
