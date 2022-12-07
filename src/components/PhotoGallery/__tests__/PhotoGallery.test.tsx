import React from 'react';

import '@testing-library/jest-dom';
import {createMemoryHistory, createLocation} from 'history';
import {render, screen} from '@testing-library/react';

import PhotoGallery from '../';
import {GALLERY_BANNERS} from '../../../data/gallery-banners-data';

const mockProps = {
  location: createLocation(''),
  history: createMemoryHistory(),
  match: {
    isExact: true,
    path: '/gallery',
    url: '/gallery/',
    params: {
      productSlug: '',
      categorySlug: '',
      groupSlug: '',
    },
  },
};

jest.mock('react-router-dom', () => ({
  Link: jest.fn(({to}) => `Link to ${to}`),
  NavLink: jest.fn(({to}) => `NavLink to ${to}`),
}));

describe('Photo gallery page without params', () => {
  beforeEach(() => {
    render(<PhotoGallery {...mockProps} />);
  });
  it('should show the title correctly', () => {
    const pageHeading = screen.getByRole('heading', {name: 'Photo gallery'});
    expect(pageHeading).toBeInTheDocument();
  });
  it('should render the correctly banners length', () => {
    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(Object.keys(GALLERY_BANNERS).length);
  });
});

describe('Photo gallery page with params', () => {
  it('should match with snapshot', () => {
    const mockWithParams = {
      ...mockProps,
      match: {
        ...mockProps.match,
        params: {
          productSlug: 'fence',
          categorySlug: 'picture-frame',
          groupSlug: 'without-lattice',
        },
      },
    };

    const {container} = render(<PhotoGallery {...mockWithParams} />);
    expect(container).toMatchSnapshot();
  });
});
