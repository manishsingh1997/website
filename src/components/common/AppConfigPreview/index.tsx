import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {isNil, isEmpty} from 'lodash';
import classNames from 'classnames';
import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {Spinner} from '@ergeon/core-components';
import {isPDFMode} from '../../../utils/utils';
import {getPreviewImage, isPlaceholderImage} from './utils';
import PreviewPDF from './PreviewPDF';
import PreviewContent from './PreviewContent';
import {AppConfigPreviewProps} from './types';
import './AppConfigPreview.scss';

const DEFAULT_FENCE_SIDE_LENGTH = 6;

const AppConfigPreview = ({
  additionalClassNames,
  fenceSideLength,
  images,
  isMobileWidth,
  propertySchemaCodeUrl,
  schemaCodeUrl,
  useNoPreviewIcon,
  withLink,
  zipCode,
}: AppConfigPreviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(previewPlaceholderIcon);
  const currentFenceSideLength = useMemo(() => fenceSideLength || DEFAULT_FENCE_SIDE_LENGTH, [fenceSideLength]);

  const configPreviewClassNames = useMemo(
    () =>
      classNames('config-preview', 'border', {
        'gallery-preview': !isEmpty(images) && isMobileWidth,
        'config-preview__no-preview': isPlaceholderImage(previewImage),
        [additionalClassNames]: Boolean(additionalClassNames),
      }),
    [additionalClassNames, images, isMobileWidth, previewImage]
  );

  const fetchQuotePreview = useCallback(async () => {
    if (useNoPreviewIcon) {
      setPreviewImage(noPreviewIcon);
      return;
    } else if (!schemaCodeUrl) {
      setPreviewImage(previewPlaceholderIcon);
      return;
    }
    setIsLoading(isEmpty(images));

    const previewImg = await getPreviewImage(schemaCodeUrl);
    setPreviewImage(previewImg);
    setIsLoading(false);
  }, [images, schemaCodeUrl, useNoPreviewIcon]);

  useEffect(function onInit() {
    fetchQuotePreview();
  }, []);

  if (isPDFMode() && !isNil(images)) {
    return <PreviewPDF images={images} />;
  }

  return (
    <div className={configPreviewClassNames}>
      {isLoading && <Spinner active borderWidth={0.15} color="blue" size={64} />}
      <PreviewContent
        fenceSideLength={currentFenceSideLength}
        handleLoad={() => setIsLoading(false)}
        images={images}
        isMobileWidth={isMobileWidth}
        previewImage={previewImage}
        propertySchemaCodeUrl={propertySchemaCodeUrl}
        schemaCodeUrl={schemaCodeUrl}
        withLink={withLink}
        zipCode={zipCode}
      />
    </div>
  );
};

export default AppConfigPreview;
