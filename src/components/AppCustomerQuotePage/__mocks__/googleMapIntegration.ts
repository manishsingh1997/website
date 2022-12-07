export const ADDRESS_INPUT_LIBRARIES = ['places'];
export const getGoogleLoader = jest.fn();
export const initGoogleLoader = jest.fn((..._apiKey: unknown[]): unknown => {
  return {_apiKey};
})

export default {
  ADDRESS_INPUT_LIBRARIES,
  initGoogleLoader,
  getGoogleLoader,
};
