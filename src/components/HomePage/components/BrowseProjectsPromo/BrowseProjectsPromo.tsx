import React from 'react';
import imgMap from '../../../../assets/map_image.jpg';
import PromoBlock from '../PromoBlock';

const BrowseProjectsPromo = () => {
  return (
    <PromoBlock
      btnLink={`${process.env.PROJECTS_GALLERY_HOST}/map`}
      btnName="Open Map"
      img={imgMap}
      subtitle="Find fence projects near your house"
      title="Browse Projects In Your Area"
    />
  )
}

export default BrowseProjectsPromo;
