import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import PreviewContent from '../';

const images = [
  {
    id: '1',
    type: 'image',
    title: 'My image',
    file: 'image.png',
  },
];

describe('PreviewContent', () => {
  it('should render PreviewWithLink and Gallery', () => {
    const {container} = render(
      <PreviewContent
        additionalClassNames=""
        images={images}
        isMobileWidth={true}
        schemaCodeUrl={'schema=3,4,5,6&code=F6,NU,SL8'}
        withLink={true}
      />
    );
    const query = container.querySelector('.quote-line-images-wrapper');
    expect(query).toBeInTheDocument();
  });
  it('should render Gallery only', () => {
    const {container} = render(
      <PreviewContent additionalClassNames="" images={images} isMobileWidth={true} schemaCodeUrl="" />
    );
    const quoteLinequery = container.querySelector('.quote-line-images-wrapper');
    const galleryQuery = container.querySelector('.mobile-length');
    expect(galleryQuery).toBeInTheDocument();
    expect(quoteLinequery).not.toBeInTheDocument();
  });
  it('should render PreviewWithLink only', () => {
    const {container} = render(
      <PreviewContent
        additionalClassNames=""
        isMobileWidth={false}
        schemaCodeUrl={'schema=3,4,5,6&code=F6,NU,SL8'}
        withLink={true}
      />
    );
    const previewLinkquery = container.querySelector('.preview-box');
    const galleryQuery = container.querySelector('.mobile-length');
    expect(galleryQuery).not.toBeInTheDocument();
    expect(previewLinkquery).toBeInTheDocument();
  });
  it('should render null', () => {
    const {container} = render(
      <PreviewContent
        additionalClassNames=""
        isMobileWidth={false}
        schemaCodeUrl={'schema=3,4,5,6&code=F6,NU,SL8'}
        withLink={false}
      />
    );
    const quoteLinequery = container.querySelector('.quote-line-images-wrapper');
    const previewLinkquery = container.querySelector('.preview-box');
    const galleryQuery = container.querySelector('.mobile-length');
    expect(quoteLinequery).not.toBeInTheDocument();
    expect(galleryQuery).not.toBeInTheDocument();
    expect(previewLinkquery).not.toBeInTheDocument();
  });
});
