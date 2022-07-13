import React, {useMemo} from 'react';
import isEmpty from 'lodash/isEmpty';
import Gallery from './Gallery';
import PreviewWithLink from './PreviewWithLink';
import {PreviewContentProps} from './types';

const PreviewContent = ({
  previewImage,
  handleLoad,
  withLink,
  schemaCodeUrl,
  images,
  isMobileWidth,
  fenceSideLength,
  fenceSideSlopePercent,
  propertySchemaCodeUrl,
  zipCode,
}: PreviewContentProps) => {
  const withLinkAndSchemaUrl = useMemo(() => Boolean(withLink && schemaCodeUrl), [withLink, schemaCodeUrl]);

  const isImagesEmpty = useMemo(() => isEmpty(images), [images]);

  const renderMobilePreviewAndGallery = useMemo(
    () => isMobileWidth && !isImagesEmpty && withLinkAndSchemaUrl,
    [isMobileWidth, isImagesEmpty, withLinkAndSchemaUrl]
  );

  const renderMobileGallery = useMemo(() => isMobileWidth && !isImagesEmpty, [isMobileWidth, isImagesEmpty]);

  if (renderMobilePreviewAndGallery) {
    return (
      <div className="quote-line-images-wrapper">
        <PreviewWithLink
          fenceSideLength={fenceSideLength}
          fenceSideSlopePercent={fenceSideSlopePercent}
          handleLoad={handleLoad}
          previewImage={previewImage}
          propertySchemaCodeUrl={propertySchemaCodeUrl}
          schemaCodeUrl={schemaCodeUrl}
          zipCode={zipCode}
        />
        <Gallery images={images} />
      </div>
    );
  }

  if (renderMobileGallery) {
    return <Gallery images={images} />;
  }

  if (withLinkAndSchemaUrl) {
    return (
      <PreviewWithLink
        fenceSideLength={fenceSideLength}
        fenceSideSlopePercent={fenceSideSlopePercent}
        handleLoad={handleLoad}
        previewImage={previewImage}
        propertySchemaCodeUrl={propertySchemaCodeUrl}
        schemaCodeUrl={schemaCodeUrl}
        zipCode={zipCode}
      />
    );
  }

  return null;
};

export default PreviewContent;
