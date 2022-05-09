export const pageText = [
  {text: 'Contact Us'},
  {
    text: 'We’re here to help! Get in touch and our team will answer your questions',
  },
  {text: 'Help Center'},
  {text: 'Send us a message'},
  {text: 'Submit'},
  {text: 'Email:'},
  {text: 'contact@ergeon.com'},
  {text: 'Phone:'},
  {text: '650-300-4854'},
];

export const inputFields = {
  name: {placeHolder: 'e.g. John Smith', label: 'Your name', errorMessage: 'Field is required'},
  email: {
    placeHolder: 'e.g. johnsmith@mail.com',
    label: 'Your email',
    errorMessage: 'Correct email should be provided',
  },
  message: {placeHolder: 'e.g. Thanks ....', label: 'Your message', errorMessage: 'Field is required'},
};

export const wrongInputField = [
  {email: ''},
  {name: ''},
  {message: ''},
  {email: 'john'},
  {email: 'john@'},
  {email: '@john'},
  {email: 'sime@john'},
  {email: 'john.com'},
  {email: 'john@com.'},
];

export const correctInputField = [
  {email: ''},
  {name: ''},
  {message: ''},
  {email: 'john'},
  {email: 'john@'},
  {email: '@john'},
  {email: 'sime@john'},
  {email: 'john.com'},
  {email: 'john@com.'},
];
