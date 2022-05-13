import React from 'react';
import {NavLink} from 'react-router-dom';

type GalleryBannerProps = {
  imageSrc: string;
  header: string;
  description: string;
  url: string;
};

const GalleryBanner = ({imageSrc, header, description, url}: GalleryBannerProps) => {
  return (
    <div className="card soft-border photo-gallery__banner">
      <div className="photo-gallery__wrapper">
        <img className="photo-gallery__wrapper-photo" src={imageSrc} />
        <div className="photo-gallery__wrapper-data">
          <h4 className="additional-header h2 spacing after__is-6">{header}</h4>
          <p className="spacing after__is-12">{description}</p>
          <NavLink className="button button--regular taste__line button--size__medium is__button-desktop" to={url}>
            Open Gallery
          </NavLink>
        </div>
      </div>
      <NavLink className="button button--regular taste__line button--size__medium is__button-phone" to={url}>
        Open Gallery
      </NavLink>
    </div>
  );
};

export default GalleryBanner;
