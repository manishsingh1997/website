import React, {useMemo} from 'react';

import noPreview from '@ergeon/core-components/src/assets/no-cad-support.svg';

import {getFencequotingURL} from '../../../utils/urls';

import PreviewImage from './PreviewImage';
import {PreviewWithLinkProps} from './types';
import {isPlaceholderImage} from './utils';

const PreviewWithLink = ({
  cadSupport,
  schemaCodeUrl,
  propertySchemaCodeUrl,
  fenceSideLength,
  fenceSideSlopePercent,
  zipCode,
  previewImage,
  handleLoad,
}: PreviewWithLinkProps) => {
  const finalSchemaCodeUrl = useMemo(() => {
    return propertySchemaCodeUrl ? `${schemaCodeUrl}&${propertySchemaCodeUrl}` : schemaCodeUrl;
  }, [schemaCodeUrl, propertySchemaCodeUrl]);

  const linkToFencequoting = useMemo(
    () =>
      getFencequotingURL({
        schemaCode: finalSchemaCodeUrl,
        zipCode: zipCode ?? '',
        fenceSideLength,
        fenceSideSlopePercent,
        options: false,
      }),
    [finalSchemaCodeUrl, zipCode, fenceSideLength, fenceSideSlopePercent]
  );

  const isPlaceholder = useMemo(() => isPlaceholderImage(previewImage), [previewImage]);

  if (isPlaceholder) {
    return <PreviewImage
      cadSupport={cadSupport}
      handleLoad={handleLoad}
      isLoading={false}
      isPlaceholder={true}
      previewImage={previewImage}
    />;
  }

  if (cadSupport !== true || previewImage === noPreview) {
    return <PreviewImage
      cadSupport={cadSupport}
      handleLoad={handleLoad}
      isLoading={false}
      isPlaceholder={false}
      previewImage={previewImage}
    />
  }

  return (
    <a href={linkToFencequoting} rel="noopener noreferrer" target="_blank">
      <PreviewImage
        cadSupport={cadSupport}
        handleLoad={handleLoad}
        isLoading={false}
        isPlaceholder={false}
        previewImage={previewImage}
      />
    </a>
  );
};

export default PreviewWithLink;
