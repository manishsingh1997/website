import load from 'load-script';
import {
  trackError,
} from 'utils/analytics';
import config from 'website/config';

load('https://js.stripe.com/v2/', function() {
  window.Stripe.setPublishableKey(config.stripePublicKey);
});

export const cardNumberValidation = (value) => {
  if (window.Stripe && !window.Stripe.card.validateCardNumber(value)) {
    return 'Incorrect card number';
  }
};

export const cardExpDateValidation = (value) => {
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
  if (window.Stripe && !window.Stripe.card.validateCVC(value)) {
    return 'Incorrect cvc';
  }
};

export const getStripeToken = (data) => {
  const expDateParts = data.exp.split('/');
  return new Promise((resolve, reject) => {
    window.Stripe.card.createToken({
      number: data.number,
      cvc: data.cvc,
      'exp_month': expDateParts[0],
      'exp_year': expDateParts[1],
    }, (status, response) => {
      if (response.error) {
        const errorMsg = response.error.message;
        trackError(response.error);
        return reject({_error: errorMsg});
      }
      return resolve(response.id);
    });
  });
};