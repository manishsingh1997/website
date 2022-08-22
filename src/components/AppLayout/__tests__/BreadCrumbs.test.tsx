import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BreadCrumbs from '../components/BreadCrumbs';

describe('Breadcrumbs tests', () => {
  it('should show breadcrumbs with profile title and icon', () => {
    render(
      <MemoryRouter initialEntries={['/app/5QMHiaxMKUi--4wR/profile']}>
        <BreadCrumbs />
      </MemoryRouter>
    );
    const profileText = screen.getByText('profile');
    const iconProfile = document.querySelector('.Icon-Profile') as HTMLInputElement;
    expect(profileText).toBeInTheDocument();
    expect(iconProfile).toBeInTheDocument();
  });

  it('should show breadcrumbs with orders title and icon', () => {
    render(
      <MemoryRouter initialEntries={['/app/5QMHiaxMKUi--4wR/orders/12345']}>
        <BreadCrumbs />
      </MemoryRouter>
    );
    const orderText = screen.getByText('orders');
    const orderNumber = screen.getByText('order #12345');
    const iconProfile = document.querySelector('.Icon-Home') as HTMLInputElement;
    expect(orderText).toBeInTheDocument();
    expect(orderNumber).toBeInTheDocument();
    expect(iconProfile).toBeInTheDocument();
  });
});
