import React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import NotFoundPage from '../NotFoundPage';

test('Should check if the title is presented on the page 404', () => {
  render(<NotFoundPage />);
  const textElement = screen.getByText('Page Not Found');
  expect(textElement).toBeInTheDocument();
});
