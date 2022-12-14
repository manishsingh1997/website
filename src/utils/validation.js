export const isEmpty = (value) => value === undefined || value === null || value === '';
const join = (rules) => {
  return (value, data) => {
    const errors = rules.map((rule) => rule(value, data)).filter((error) => !!error);
    return errors[0];
  };
};
export const emailRe =
  /^[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/i; // eslint-disable-line max-len
export const phoneRe = /^\(\d{0,3}\) \d{0,3}\-\d{0,4}$/;

export const email = (value) => {
  if (!isEmpty(value) && !emailRe.test(value)) {
    return 'Email format is user@example.com';
  }
};

export const maxLengthFactory = (lengthLimit) => {
  const maxLength = (value) => {
    if (!isEmpty(value) && value.length >= lengthLimit) {
      return `Message length should be less than ${lengthLimit} symbols`;
    }
  };
  return maxLength;
};

export const phone = (value) => {
  if (!isEmpty(value) && !phoneRe.test(value)) {
    return 'Phone number format: (555) 555-5555';
  }
};

export const required = (value, fields, errorMessage = 'This field is required') => {
  if (isEmpty(value) || value.length === 0 || (value && value.choices && !value.value)) {
    return errorMessage;
  }
};

const zipcodeRe = /\d{5}/;
export const zipcode = (value) => {
  if (!zipcodeRe.test(value)) {
    return 'Enter 5 didgets zip code';
  }
  return null;
};

export const internalUrl = (value) => /^\//.test(value);

export const createValidator = (rules) => {
  return (values = {}) => {
    const errors = {};
    let empry = true;
    // validatorsOrValidate can be both "array of validators"
    // or "function" that must return true or array of validators
    for (const fieldName in rules) {
      const validatorsOrValidate = rules[fieldName];
      let validators;

      if (typeof validatorsOrValidate === 'function') {
        const result = validatorsOrValidate(values);
        if (Array.isArray(result)) {
          validators = result;
        }
      } else {
        validators = validatorsOrValidate;
      }

      if (Array.isArray(validators)) {
        // concat enables both functions and arrays of functions
        const rule = join([].concat(validators));
        const error = rule(values[fieldName], values);
        if (error) {
          empry = false;
          errors[fieldName] = [error];
        }
      }
    }
    return empry ? null : errors;
  };
};
