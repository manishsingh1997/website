import React, {useMemo} from 'react';
import {getFencequotingURL} from '../../../utils/urls';
import PreviewImage from './PreviewImage';
import {PreviewWithLinkProps} from './types';
import {isPlaceholderImage} from './utils';

const PreviewWithLink = ({
  schemaCodeUrl,
  propertySchemaCodeUrl,
  fenceSideLength,
  zipCode,
  previewImage,
  handleLoad,
}: PreviewWithLinkProps) => {
  const finalSchemaCodeUrl = useMemo(() => {
    return propertySchemaCodeUrl ? `${schemaCodeUrl}&${propertySchemaCodeUrl}` : schemaCodeUrl;
  }, [schemaCodeUrl, propertySchemaCodeUrl]);

  const linkToFencequoting = useMemo(
    () => getFencequotingURL(finalSchemaCodeUrl, Number(zipCode), fenceSideLength, false),
    [finalSchemaCodeUrl, zipCode, fenceSideLength]
  );

  const isPlaceholder = useMemo(() => isPlaceholderImage(previewImage), [previewImage]);

  if (isPlaceholder) {
    return <PreviewImage handleLoad={handleLoad} isLoading={false} isPlaceholder={true} previewImage={previewImage} />;
  }

  return (
    <a href={linkToFencequoting} rel="noopener noreferrer" target="_blank">
      <PreviewImage handleLoad={handleLoad} isLoading={false} isPlaceholder={false} previewImage={previewImage} />
    </a>
  );
};

export default PreviewWithLink;
