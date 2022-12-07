import React from 'react';

// eslint-disable-next-line import/named
import {match, RouteComponentProps} from 'react-router-dom';

import './index.scss';

import GalleryPreview from './GalleryPreview';
import GalleryContent from './GalleryContent';

type Params = {
  categorySlug: string;
  groupSlug: string;
  productSlug: string;
};

export type PhotoGalleryProps = {
  children?: React.ReactNode;
  match: match<Params>;
} & RouteComponentProps;

const PhotoGallery = ({history, location, match}: PhotoGalleryProps) => {
  const {productSlug} = match.params;

  if (!productSlug) {
    return <GalleryPreview />;
  }

  return <GalleryContent history={history} location={location} match={match} />;
};

export default PhotoGallery;
