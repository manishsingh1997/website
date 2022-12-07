import React, {useCallback} from 'react';

import isEmpty from 'lodash/isEmpty';
import Carousel, {Modal, ModalGateway} from 'react-images';

import {Photo} from './GalleryContent';

type GalleryModalProps = {
  photos: Photo[];
  imageIndex?: number;
  handleModalClose: () => void;
  handleViewChange: (index: number) => void;
};

const GalleryModal = ({photos, imageIndex, handleModalClose, handleViewChange}: GalleryModalProps) => {
  const onClose = useCallback(() => {
    handleModalClose();
  }, [handleModalClose]);

  return (
    <ModalGateway>
      {!isEmpty(photos) && imageIndex !== undefined && (
        <Modal onClose={() => onClose()}>
          <Carousel
            currentIndex={imageIndex}
            trackProps={{
              onViewChange: (index) => handleViewChange(index),
            }}
            views={photos.map(({caption, url}) => ({caption, src: url, source: url}))}
          />
        </Modal>
      )}
    </ModalGateway>
  );
};

export default GalleryModal;
