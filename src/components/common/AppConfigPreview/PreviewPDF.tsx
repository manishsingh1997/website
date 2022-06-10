import React from 'react';
import {ImageCard} from '@ergeon/core-components';
import {Image} from './types';

const PreviewPDF = ({images}: {images: Image[]}) => (
  <div className="cards two-columns">
    {images.map((elem) => (
      <ImageCard key={elem.id} title={elem.title} url={elem.file} />
    ))}
  </div>
);

export default PreviewPDF;
