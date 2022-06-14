/* eslint-disable max-len */
export const selectedConfigs = [
  {
    id: 'test-config-id',
    catalog_type: 'fence-side',
    code: 'schema=3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,32,47,48,49,130,144&code=F6,NU,SL8,BB,FT,PK8,RC,POS,PT4,PPT,PD2,PH8,PRNA,KZ,K0,R3,LZ,L0,RW0,CZS,RC,R24,RCZ,SLZ,RPT',
    product: null,
    preview: null,
    description:
      'Finish Height of 6\'; Nail Up, Board on Board, Flat Top 1"x8" Redwood Con Common Pickets, 4"x4" PT Brown Stained Posts , 3 Redwood Con Common 2”x4” Rails, Demo and Haul Away',
    price: '50.39',
    units: 1,
    timestamp: 1647948387000,
  },
  {
    id: 'test-gate-config-id',
    catalog_type: 'fence-gate',
    code: 'schema=24,25,26,27,28,29,30,31,212,2132&code=SG,GDT,GF6,GW4,GRCC,GP4,GZSF,GLSLK,GODNS,LPNA',
    product: null,
    preview: null,
    description:
      'Single Gate; 4\' Wide Picture Frame Board on Board with a Finish Height of 6\' built with Redwood Con Common Pickets and 4"x4" PT Brown Stained Posts and a Standard Latch',
    price: '498',
    units: 1,
    timestamp: 1651582151000,
  },
];

export const addressData = {
  primary_number: '12',
  street_name: 'Palo Alto Avenue',
  city_name: 'Palo Alto',
  state_abbreviation: 'CA',
  zipcode: '94301',
  location: {
    lat: 37.4465663,
    lng: -122.170966,
  },
  formatted_address: '12 Palo Alto Ave, Palo Alto, CA 94301, USA',
  raw_address: '12 Palo Alto Ave, Palo Alto, CA 94301, USA',
  place_types: ['street_address'],
};

const productAvailabilityData = {
  zipcode: '94301',
  supported: true,
  products: {
    'driveway-installation': true,
    'fence-replacement': true,
  },
  market: 'CN-SJ',
};

export const leadData = {
  address: addressData,
  product_slug: 'fence-replacement',
  productAvailability: productAvailabilityData,
  zipcode: productAvailabilityData.zipcode,
};
