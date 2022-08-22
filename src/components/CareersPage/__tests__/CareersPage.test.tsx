import React from 'react';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import CareersPage from '../index';

jest.mock('axios');

describe('Render Careers page', () => {
  it('should render the correct heading', () => {
    render(<CareersPage />);
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Everyone Should Have Access To The Job They Love',
    });
    expect(heading).toBeInTheDocument();
  });
  it('should render the cards correctly', () => {
    render(<CareersPage />);
    expect(screen.getByText('Positively Impact Lives')).toBeInTheDocument();
    expect(screen.getByText('Interesting Problems')).toBeInTheDocument();
    expect(screen.getByText('Exponential Growth')).toBeInTheDocument();
    expect(screen.getByText('Global Team')).toBeInTheDocument();
  });
  it('should render the team image', () => {
    render(<CareersPage />);
    const img = screen.getByAltText('company photo');
    expect(img).toBeInTheDocument();
  });
});
