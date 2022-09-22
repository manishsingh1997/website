import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {isNil, isEmpty} from 'lodash';
import classNames from 'classnames';
import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import notCadSupportPreviewIcon from '@ergeon/core-components/src/assets/no-cad-support.jpg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {Spinner} from '@ergeon/core-components';

import {isPDFMode, showUpcomingFeatures} from '../../../utils/utils';

import {getPreviewImage, isPlaceholderImage} from './utils';
import PreviewPDF from './PreviewPDF';
import PreviewContent from './PreviewContent';
import {AppConfigPreviewProps} from './types';
import './AppConfigPreview.scss';

const DEFAULT_FENCE_SIDE_LENGTH = 6;
const DEFAULT_GRADE = 0;

const AppConfigPreview = ({
  previewImage: initPreviewImage,
  cadSupport,
  additionalClassNames,
  fenceSideLength,
  fenceSideSlopePercent,
  images,
  isMobileWidth,
  propertySchemaCodeUrl,
  schemaCodeUrl,
  useNoPreviewIcon,
  withLink,
  zipCode,
}: AppConfigPreviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(initPreviewImage || previewPlaceholderIcon);
  let isMounted = true;
  const currentFenceSideLength = useMemo(() => fenceSideLength || DEFAULT_FENCE_SIDE_LENGTH, [fenceSideLength]);
  const currentGrade = useMemo(() => fenceSideSlopePercent || DEFAULT_GRADE, [fenceSideSlopePercent]);

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
    } else if (showUpcomingFeatures('ENG-18304') && !cadSupport) {
      setPreviewImage(notCadSupportPreviewIcon);
      return;
    } else if (!schemaCodeUrl) {
      setPreviewImage(previewPlaceholderIcon);
      return;
    } else if (previewImage !== previewPlaceholderIcon) {
      return;
    }
    setIsLoading(isEmpty(images));

    const previewImg = await getPreviewImage(schemaCodeUrl);
    if (isMounted) {
      setPreviewImage(previewImg);
      setIsLoading(false);
    }
  }, [images, schemaCodeUrl, useNoPreviewIcon]);

  useEffect(function onInit() {
    fetchQuotePreview();
    return () => {
      isMounted = false
    }
  }, []);

  if (isPDFMode() && !isNil(images)) {
    return <PreviewPDF images={images} />;
  }

  return (
    <div className={configPreviewClassNames}>
      {isLoading && <Spinner active borderWidth={0.15} color="blue" size={64} />}
      <PreviewContent
        cadSupport={cadSupport}
        fenceSideLength={currentFenceSideLength}
        fenceSideSlopePercent={currentGrade}
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
