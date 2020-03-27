import {
  trackError,
} from 'utils/analytics';
import config from 'website/config';

const initStripe = (function() {
  let keyInitialized = false;

  return function() {
    if (!keyInitialized) {
      window.Stripe && window.Stripe.setPublishableKey(config.stripePublicKey);
      keyInitialized = true;
    }
  };
})();

export const cardNumberValidation = (value) => {
  initStripe();
  if (window.Stripe && !window.Stripe.card.validateCardNumber(value)) {
    return 'Incorrect card number';
  }
};

export const cardExpDateValidation = (value) => {
  initStripe();
  const error = 'Incorrect exp. date';

  if (value) {
    value = value.split('/');
    if (value.length !== 2 || window.Stripe && !window.Stripe.card.validateExpiry(value[0], value[1])) {
      return error;
    }
  } else {
    return error;
  }
};
export const cardCvcValidation = (value) => {
  initStripe();
  if (window.Stripe && !window.Stripe.card.validateCVC(value)) {
    return 'Incorrect cvc';
  }
};

export const getStripeToken = (data) => {
  initStripe();
  const expDateParts = data.expirationDate.split('/');
  return new Promise((resolve, reject) => {
    window.Stripe.card.createToken({
      number: data.card,
      cvc: data.cvc,
      'exp_month': expDateParts[0],
      'exp_year': expDateParts[1],
    }, (status, response) => {
      if (response.error) {
        const errorMsg = response.error.message;
        const errorParam = {
          'invalid_expiry_month': 'expirationDate',
          'invalid_expiry_year': 'expirationDate',
          'invalid_number': 'card',
          'invalid_card_type': 'card',
          'invalid_cvc': 'cvc',
        }[response.error.code];

        if (errorParam) {
          trackError(response.error);
        }

        return reject({_error: errorMsg, param: errorParam});
      }
      return resolve(response.id);
    });
  });
};