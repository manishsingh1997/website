import React from 'react';

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { mockStripe, mockElement } from '../__mocks__/StripeMocks';
import BillingForm from '../BillingForm';

jest.mock('@stripe/react-stripe-js', () => {
  const stripe = jest.requireActual('@stripe/react-stripe-js');

  return {
    ...stripe,
    Elements: jest.fn(({ children }) => children),
    Element: () => {
      return mockElement();
    },
    useStripe: () => {
      return mockStripe();
    },
    useElements: jest.fn().mockReturnValue({
      getElement: jest.fn(() => true),
    }),
    CardNumberElement: jest.fn(() => (<div>Card Number</div>)),
    CardExpiryElement: jest.fn(() => (<div>Card Expiry</div>)),
    CardCvcElement: jest.fn(() => (<div>Card CVC</div>)),
  };
});

jest.mock('@stripe/stripe-js', () => {
  const stripe = jest.requireActual('@stripe/stripe-js');

  return {
    ...stripe,
    loadStripe: jest.fn(() => Promise.resolve(mockStripe())),
  };
});

const mockBillingFormProps = {
  contractUrl: 'https://www.ergeon.com',
  error: null,
  isApproved: true,
  isScopeChange: false,
  onSubmit: jest.fn(),
  approvalPayMethod: null,
  quoteId: 1,
  total: '$1000',
  isSmall: false,
};

describe('BillingForm tests', () => {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY as string);
  it('Should render BillingForm', () => {
    render(<Elements stripe={stripePromise}>
      <BillingForm {...mockBillingFormProps} />
    </Elements>);
    expect(BillingForm).toBeDefined();
  });

  it('Should display BillingForm elements', () => {
    render(<Elements stripe={stripePromise}>
      <BillingForm {...mockBillingFormProps} />
    </Elements>);
    const billingText = screen.getByText('Billing Information');
    const total = screen.getByText('$1000');
    const terms = screen.getByText('I accept');
    const approveBtn = screen.getByText('Approve and place order');
    expect(billingText).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(terms).toBeInTheDocument();
    expect(approveBtn).toBeInTheDocument();
  });

  it('Should display error message', () => {
    render(<Elements stripe={stripePromise}>
      <BillingForm {...mockBillingFormProps} error="Test Error" />
    </Elements>);
    const error = screen.getByText(/There was an error trying to approve payment.*Test Error/);
    expect(error).toBeInTheDocument();
  });

  it('Should display Stripe Elements', () => {
    render(<Elements stripe={stripePromise}>
      <BillingForm {...mockBillingFormProps} isApproved={false} />
    </Elements>);
    const cardNumber = screen.getByText('Card Number');
    const cardExpiry = screen.getByText('Card Expiry');
    const cardCvc = screen.getByText('Card CVC');
    expect(cardNumber).toBeInTheDocument();
    expect(cardExpiry).toBeInTheDocument();
    expect(cardCvc).toBeInTheDocument();
  });

  it('Should call onSubmit', async () => {
    const submitCallback = jest.fn();
    render(<Elements stripe={stripePromise}>
      <BillingForm {...mockBillingFormProps} isApproved={false} onSubmit={submitCallback} />
    </Elements>);

    const acceptTerms = screen.getByTestId('accept-terms-button');
    fireEvent.click(acceptTerms);
    const approveBtn = screen.getByText('Approve and place order');
    act(() => {
      fireEvent.click(approveBtn);
    });
    await waitFor(() => expect(submitCallback).toHaveBeenCalledTimes(1));
  });
});
