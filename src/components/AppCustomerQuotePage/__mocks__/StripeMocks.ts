export const mockElement = () => ({
  mount: jest.fn(),
  destroy: jest.fn(),
  on: jest.fn(),
  update: jest.fn(),
});

export const mockElements = () => {
  const elements: { [key: string]: ReturnType<typeof mockElement> } = {};
  return {
    create: jest.fn((type) => {
      elements[type] = mockElement();
      return elements[type];
    }),
    getElement: jest.fn((type) => {
      return elements[type] || null;
    }),

  };
};

export const mockStripe = () => ({
  elements: jest.fn(() => mockElements()),
  createToken: jest.fn().mockResolvedValue({
    token: {
      id: 'tok_SomeTokenId',
    },
  }),
  createSource: jest.fn(),
  createPaymentMethod: jest.fn(),
  confirmCardPayment: jest.fn(),
  confirmCardSetup: jest.fn(),
  paymentRequest: jest.fn(),
  registerAppInfo: jest.fn(),
  _registerWrapper: jest.fn(),
});
