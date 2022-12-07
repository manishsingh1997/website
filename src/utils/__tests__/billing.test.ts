import {initStripe} from '../billing';

const original = window.Stripe;
window.Stripe = {
    ...window.Stripe,
    testtoken: '',
    setPublishableKey(arg: string){
        this.testtoken = arg
    }
}

describe('Test for utils billing', () => {
  beforeAll(() => {
    jest.spyOn(window.Stripe, 'setPublishableKey').mockImplementation(function (arg){
      window.Stripe.testtoken = arg
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
    window.Stripe = original;
  });

  test('It initializes stripe', () => {
    initStripe();
    expect(window.Stripe.testtoken).toBeTruthy();
  });
});
