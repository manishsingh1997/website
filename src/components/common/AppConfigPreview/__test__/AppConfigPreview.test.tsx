import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {calcUtils} from '@ergeon/3d-lib';

import AppConfigPreview from '../';

import * as utils from '../../../../utils/utils';

const mockedCalcUtils = jest.spyOn(calcUtils, 'getPreviewImage');
const result =
  'https://ergeon-converters.s3-us-west-2.amazonaws.com/staging/schema=3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,32,47,48,49,130,144,220,221,222,223,226&code=F6,NU,SL8,SS,DE,PK6,RC,ZPO,PT4,PPT,PD2,PH8,PRZ,KPT,1K12,R3,LZ,L0,RW0,CZS,PT,R24,RCZ,SLZ,RPT,PSN,NA,PGNA,CRNA,FPNS/300x300_2d-front.png';

mockedCalcUtils.mockImplementation(() => {
  return new Promise((resolve) => resolve(result));
});

const props = {
  additionalClassNames: 'quote-line-preview',
  configType: 'Side',
  fenceSideLength: 6,
  isMobileWidth: false,
  propertySchemaCodeUrl: 'property_schema=1,2&property_code=DY,DRY',
  schemaCodeUrl: `schema=3,4,5,6,7,8,9,10,11,12,13,14,15
  ,16,17,18,20,21,22,32,47,48,49,130,144,220,221,222,223,
  226&code=F6,NU,SL8,SS,DE,PK6,RC,ZPO,PT4,PPT,PD2,PH8,PRZ,KPT,
  1K12,R3,LZ,L0,RW0,CZS,PT,R24,RCZ,SLZ,RPT,PSN,NA,PGNA,CRNA,FPNS`,
  useNoPreviewIcon: false,
  withLink: true,
  zipCode: '95820',
  images: [],
};

const images = [
  {
    id: '1',
    type: 'image',
    title: 'My image',
    file: 'image.png',
  },
];

describe('AppConfigPreview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should getPreviewImage has ben called 1 times', () => {
    render(<AppConfigPreview {...props} />);
    expect(mockedCalcUtils).toHaveBeenCalledTimes(1);
  });
  it('should getPreviewImage has not be called when useNoPreviewIcon is false', () => {
    render(<AppConfigPreview {...props} useNoPreviewIcon={true} />);
    expect(mockedCalcUtils).toHaveBeenCalledTimes(0);
  });
  it('should render PDF mode', () => {
    jest.spyOn(utils, 'isPDFMode').mockReturnValue(true);
    const {container} = render(<AppConfigPreview {...props} images={images} />);
    const query = container.querySelector('.cards.two-columns');
    expect(query).toBeInTheDocument();
  });
});
