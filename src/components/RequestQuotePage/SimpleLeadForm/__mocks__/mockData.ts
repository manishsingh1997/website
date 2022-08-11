import {CatalogType} from '@ergeon/3d-lib';

export const mockAddress = {
  primary_number: '123',
  street_name: 'Palo Alto Avenue',
  city_name: 'Palo Alto',
  state_abbreviation: 'CA',
  zipcode: '94301',
  formated_address: '123 Palo Alto Avenue, Palo Alto, CA 94301',
  raw_address: '123 Palo Alto Avenue, Palo Alto, CA 94301',
};

export const mockProps = {
  onSubmit: () => jest.fn(),
  onProductChange: () => jest.fn(),
  lead: {},
  product: '',
  configs: [
    {
      catalog_type: CatalogType.FENCE,
      code: '',
      description: '',
      price: '',
      units: '',
      grade: '',
    },
  ],
  user: {
    email: '',
    full_name: '',
    phone_number: '',
  },
};
