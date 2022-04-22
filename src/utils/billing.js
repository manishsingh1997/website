import {trackError} from 'utils/analytics';

const initStripe = (function () {
  let keyInitialized = false;

  return function () {
    if (!keyInitialized) {
      window.Stripe && window.Stripe.setPublishableKey(process.env.STRIPE_PUBLIC_KEY);
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
    if (value.length !== 2 || (window.Stripe && !window.Stripe.card.validateExpiry(value[0], value[1]))) {
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
    window.Stripe.card.createToken(
      {
        number: data.card,
        cvc: data.cvc,
        exp_month: expDateParts[0],
        exp_year: expDateParts[1],
      },
      (status, response) => {
        if (response.error) {
          const errorMsg = response.error.message;
          const errorParam = {
            invalid_expiry_month: 'expirationDate',
            invalid_expiry_year: 'expirationDate',
            invalid_number: 'card',
            invalid_card_type: 'card',
            invalid_cvc: 'cvc',
          }[response.error.code];

          if (errorParam) {
            trackError(new Error(errorMsg));
          }

          return reject({_error: errorMsg, param: errorParam});
        }
        return resolve(response.id);
      }
    );
  });
};

export const VISA = 'Visa';
export const MASTERCARD = 'Mastercard';
export const AMEX = 'AMEX';
export const DISCOVER = 'Discover';
export const DINERS = 'Diners';
export const JCB = 'JCB';
export const VISA_ELECTRON = 'Visa Electron';

export const getCardType = (number) => {
  // Visa
  let re = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  let type = '';
  if (number.match(re) != null) {
    type = VISA;
  }

  // Mastercard
  re = new RegExp('^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$');
  if (number.match(re) != null) {
    type = MASTERCARD;
  }

  // AMEX
  re = new RegExp('^3[47][0-9]{13}$');
  if (number.indexOf('34') === 0 || number.indexOf('37') === 0 || number.match(re) != null) {
    type = AMEX;
  }

  // Discover
  re = new RegExp('^6(?:011|5[0-9]{2})[0-9]{12}$');
  if (number.match(re) != null) {
    type = DISCOVER;
  }

  // Diners
  re = new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{11}$');
  if (number.match(re) != null) {
    type = DINERS;
  }

  // JCB
  re = new RegExp('^(?:2131|1800|35\\d{3})\\d{11}$');
  if (number.match(re) != null) {
    type = JCB;
  }

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null) {
    type = VISA_ELECTRON;
  }

  return type;
};
