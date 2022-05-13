import React, {useMemo} from 'react';
import {Tabs} from '@ergeon/core-components';
import {ProductCategory} from './GalleryContent';

type GalleryTabsProps = {
  productData: ProductCategory[];
  productSlug: string;
  categorySlug: string;
};

const GalleryTabs = ({productData, productSlug, categorySlug}: GalleryTabsProps) => {
  const tabItems = useMemo(() => {
    return productData.map((category: ProductCategory) => ({
      content: category.categoryName,
      id: `tab-${category.categorySlug}`,
      to: `/gallery/${productSlug}/${category.categorySlug}`,
      active: categorySlug === category.categorySlug,
      exact: false,
    }));
  }, [productData, productSlug, categorySlug]);

  return (
    <div className="header-border">
      <div className="photo-gallery__categories wrapper-1180">
        <Tabs items={tabItems} useNavLinks />
      </div>
    </div>
  );
};

export default GalleryTabs;
