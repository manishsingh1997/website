import React from 'react';
import isNil from 'lodash/isNil';

export type Partners = {
  name: string;
  slug: string;
  url: string;
  imageSrc: string;
};

type PartnersProps = {
  partners: Partners[];
};
const GalleryPartners = ({partners}: PartnersProps) => {
  if (isNil(partners)) return null;
  return (
    <div className="photo-gallery__partners-area">
      <label className="label uppercase spacing after__is-12">
        FOR ADDITIONAL CUSTOMIZED OPTIONS VISIT OUR PARTNER LINKS
      </label>
      <div className="photo-gallery__partners">
        {partners?.map(({name, slug, url, imageSrc}) => (
          <a
            className="photo-gallery__partner card soft-border shadow__z1"
            href={url}
            key={`partner-${slug}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="photo-gallery__partner-image" style={{backgroundImage: `url(${imageSrc})`}} />
            <div className="photo-gallery__partner-description">
              <div>
                <h4 className="additional-header h4">{name}</h4>
                <div className="photo-gallery__partner-site">{url}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GalleryPartners;
