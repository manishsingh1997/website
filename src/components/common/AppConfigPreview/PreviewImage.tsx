import React, {useMemo} from 'react';
import classNames from 'classnames';
import preview3DIcon from '@ergeon/core-components/src/assets/icon-3d.svg';
import {PreviewImageProps} from './types';

const PreviewImage = ({previewImage, isPlaceholder, isLoading, handleLoad}: PreviewImageProps) => {
  const previewImageClassNames = useMemo(
    () =>
      classNames({
        'preview-image': true,
        'preview-placeholder': isPlaceholder,
        'hidden-img': isLoading,
      }),
    [isPlaceholder, isLoading]
  );

  return (
    <div className="preview-box">
      <img className={previewImageClassNames} onLoad={handleLoad} src={previewImage} />
      {!isPlaceholder && <img className="preview-3d" src={preview3DIcon} />}
    </div>
  );
};

export default PreviewImage;
