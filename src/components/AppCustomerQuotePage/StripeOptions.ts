import stripeJs from '@stripe/stripe-js';

export const StripeOptions = {
  locale: 'en',
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@400;500;600;700&display=swap',
    }
  ],
} as stripeJs.StripeElementsOptions;
