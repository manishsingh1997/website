import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import faqData from '../../../data/faq-data';

import FAQPage from '../';

describe('FAQPage', () => {
  beforeEach(() => {
    render(<FAQPage />);
  });

  it('should show correct FAQ title', () => {
    const title = screen.getByRole('heading', {name: 'Frequently Asked Questions'});
    expect(title).toBeInTheDocument();
  });

  it('should show correct phone number', () => {
    const phone = screen.getByRole('link', {name: 'call us'});
    expect(phone).toHaveAttribute('href', 'tel:+16503004854');
  });

  it('should render all questions correctly', () => {
    const title = screen.getAllByRole('heading', {level: 3});
    expect(title).toHaveLength(faqData.length);
  });
});
