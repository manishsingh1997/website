import React from 'react';
import {render, screen, fireEvent, waitForElementToBeRemoved, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {googleIntegration} from '@ergeon/core-components';
import IconCross from '@ergeon/core-components/src/assets/icon-cross-gray.svg';

import AppCustomerQuotePage from '../index';
import * as API from '../../../api/app';

import * as mockAPI from '../__mocks__/api';
import {initGoogleLoader, getGoogleLoader} from '../__mocks__/googleMapIntegration';
import quoteApproval from '../__mocks__/data/ApprovedQuote';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
jest.mock('react-signature-canvas', () => (_props: unknown) => {
  return <div></div>;
});

beforeEach(() => {
  jest.spyOn(API, 'getQuoteApprovalDetails').mockImplementation(mockAPI.ApprovedQuoteDetails);
  jest.spyOn(API, 'reviewQuoteApproval').mockImplementation(mockAPI.reviewQuoteApproval);
  jest.spyOn(API, 'updateCustomerSignOffRequirement').mockImplementation(mockAPI.updateCustomerSignOffRequirement);

  jest.spyOn(googleIntegration, 'initGoogleLoader').mockImplementation(initGoogleLoader);
  jest.spyOn(googleIntegration, 'getGoogleLoader').mockImplementation(getGoogleLoader);
  jest.spyOn(console, 'warn').mockImplementation(() => null );

  googleIntegration.initGoogleLoader('key', 'lib');
});

afterEach(() => {
  jest.restoreAllMocks();
});

const matcher = (string: string, options?: string) => new RegExp(string, options || '');
const props = {
  auth: {user: {gid: 'BkU5j7FtBtxjkEAU'}},
  match: {
    params: {
      secret: 'W8C5V0zBVqQQt3hk',
      path: '/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct',
    },
  },
  setPDFHeaderPhoneAction: jest.fn,
  layout: {phoneNumber: '+1538748444'},
};

describe('Project signoff', () => {
  describe('Desktop', () => {
    test('When app quote page loads, it shows project signoff section', async () => {
      render(
        <MemoryRouter initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct']}>
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);
      const signoff = screen.getByText(matcher('Begin Project Sign-off', 'i'));
      const isComplete = screen.queryByText(matcher('Project Sign-Off Complete', 'i'));

      expect(signoff).toBeInTheDocument();
      expect(isComplete).not.toBeInTheDocument();
    });

    test('When signoff button is clicked it redirects to signoff route', async () => {
      const history = createBrowserHistory({
        basename: '/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct',
      });
      render(
        <Router history={history}>
          <AppCustomerQuotePage {...props} />
        </Router>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);
      const signoff = screen.getByText(matcher('Begin Project Sign-off', 'i'));
      expect(signoff).toBeInTheDocument();

      fireEvent.click(signoff);
      const pathnameHasSignOff = matcher('sign-off').test(history.location.pathname);
      expect(pathnameHasSignOff).toBeTruthy();
    });

    test('Sign off popup displays correctly', async () => {
      render(
        <MemoryRouter initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct']}>
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);
      const signoff = screen.getByText(matcher('Begin Project Sign-off', 'i'));
      expect(signoff).toBeInTheDocument();

      fireEvent.click(signoff);

      const titles = screen.getByTestId(matcher('signoff-item-title', 'i'));
      const orderTitle = matcher('ORDER ID').test(titles.textContent || '');
      const customerTitle = matcher('CUSTOMER').test(titles.textContent || '');
      const dateTitle = matcher('DATE').test(titles.textContent || '');

      const input = document.querySelector('.erg-input--text');
      const signOffContainer = document.querySelector('.SignOff');

      const submitButton = screen.getByText(matcher('Submit', 'i'));

      expect(signOffContainer).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      expect(titles).toBeInTheDocument();
      expect(orderTitle).toBeTruthy();
      expect(customerTitle).toBeTruthy();
      expect(dateTitle).toBeTruthy();
    });

    test('User can input details on form field enabling submit button', async () => {
      render(
        <MemoryRouter initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct/sign-off']}>
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);

      const input = document.querySelector('.erg-input--text') as HTMLInputElement;
      const submitButton = screen.getByText(matcher('Submit', 'i'));
      expect(submitButton).toBeDisabled();

      fireEvent.change(input, {target: {value: 'john doe'}});

      expect(submitButton).not.toBeDisabled();
      expect(input.value?.trim()).toBe('john doe');
    });

    test('When user submits, signature is displayed for desktop', async () => {
      render(
        <MemoryRouter initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct/sign-off']}>
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);

      const input = document.querySelector('.erg-input--text') as HTMLInputElement;
      const submitButton = screen.getByText(matcher('Submit', 'i'));

      fireEvent.change(input, {target: {value: 'sampleDataUrl'}});
      fireEvent.click(submitButton);
      const buttonLoader = screen.getByTestId(matcher('button-spinner', 'i'));

      await waitForElementToBeRemoved(buttonLoader);
      const signature = screen.getByAltText(matcher('Signature', 'i'));
      expect(submitButton).not.toBeInTheDocument();
      expect(input).not.toBeInTheDocument();
      expect(signature).toBeInTheDocument();
    });

    test('it maintains input for failed submit', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      jest.spyOn(API, 'updateCustomerSignOffRequirement').mockImplementation((_customerGID, _data) => {
        throw new Error('failed');
      });
      render(
        <MemoryRouter initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct/sign-off']}>
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);

      const input = document.querySelector('.erg-input--text') as HTMLInputElement;
      const submitButton = screen.getByText(matcher('Submit', 'i'));

      fireEvent.change(input, {target: {value: 'john doe'}});
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
        expect(input).toBeInTheDocument();
      });
      jest.spyOn(API, 'updateCustomerSignOffRequirement').mockImplementation(mockAPI.updateCustomerSignOffRequirement);
    });

    test('it displays pdf view', async () => {
      // eslint-disable-next-line
      jest.spyOn(API, 'getQuoteApprovalDetails').mockImplementation((_customerGID): any => {
        return {
          data: {
            ...quoteApproval,
            signoff_at: new Date().toString(),
            signoff_by: '1',
            signoff_pdf: 'http://local',
            signoff_img: IconCross,
          },
          status: 200,
          statusText: 'OK',
          headers: '',
          config: {},
        };
      });
      render(
        <MemoryRouter
          initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct/sign-off?asPDF=true']}
        >
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);

      const input = document.querySelector('.erg-input--text') as HTMLInputElement;
      const submitButton = screen.queryByText(matcher('Submit', 'i'));

      await waitFor(() => {
        expect(submitButton).not.toBeInTheDocument();
        expect(input).not.toBeInTheDocument();
      });
      jest.spyOn(API, 'updateCustomerSignOffRequirement').mockImplementation(mockAPI.updateCustomerSignOffRequirement);
    });
  });

  describe('Mobile', () => {
    const windowWidth = window.innerWidth;
    beforeAll(() => {
      window.innerWidth = 374;
    });

    afterAll(() => {
      window.innerWidth = windowWidth;
    });

    test("When on mobile screen it display's signoff top nav", async () => {
      render(
        <MemoryRouter initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct']}>
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getByTestId(/loader-image/i);
      await waitForElementToBeRemoved(loader);

      const signoffMobile = screen.getByTestId(/signoff-topNav/i);
      expect(signoffMobile).toBeInTheDocument();
    });

    test('When signoff top nav is clicked it redirects to signoff route on mobile', async () => {
      const history = createBrowserHistory({
        basename: '/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct',
      });
      render(
        <Router history={history}>
          <AppCustomerQuotePage {...props} />
        </Router>
      );

      const loader = screen.getByTestId(/loader-image/i);
      await waitForElementToBeRemoved(loader);

      const signoffMobile = screen.getByTestId(/signoff-topNav/i);

      fireEvent.click(signoffMobile);

      const pathnameHasSignOff = matcher('sign-off').test(history.location.pathname);
      expect(pathnameHasSignOff).toBeTruthy();
    });

    test('When user submits sign stamp is displayed for mobile', async () => {
      render(
        <MemoryRouter initialEntries={['/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct/sign-off']}>
          <AppCustomerQuotePage {...props} />
        </MemoryRouter>
      );

      const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
      await waitForElementToBeRemoved(loader);

      const signoffMobile = screen.getByTestId(/signoff-topNav/i);
      fireEvent.click(signoffMobile);

      const input = document.querySelector('.erg-input--text') as HTMLInputElement;
      const submitButton = await screen.findByText(matcher('submit', 'i'));

      fireEvent.change(input, {target: {value: 'john doe'}});
      fireEvent.click(submitButton);

      await waitFor(() => {
        const signedName = screen.getByTestId(matcher('name-stamp', 'i'));
        const signedDate = screen.getByTestId(matcher('date-stamp', 'i'));
        const signedAddress = screen.getByTestId(matcher('address-stamp', 'i'));

        expect(submitButton).not.toBeInTheDocument();
        expect(input).not.toBeInTheDocument();
        expect(signedName).toBeInTheDocument();
        expect(signedAddress).toBeInTheDocument();
        expect(signedDate).toBeInTheDocument();
      });
    });
  });
});

describe('Project signoff - approved quote', () => {
  test('Do not shot Project signoff for quotes not approved', async () => {
  jest.spyOn(API, 'getQuoteApprovalDetails').mockImplementation(mockAPI.CancelledQuoteDetails);

    const history = createBrowserHistory({
      basename: '/app/BkU5j7FtBtxjkEAU/quote-approvals/W8C5V0zBVqQQt3hk/direct',
    });
    render(
      <Router history={history}>
        <AppCustomerQuotePage {...props} />
      </Router>
    );

    const loader = screen.getAllByTestId(matcher('loader-image', 'i'));
    await waitForElementToBeRemoved(loader);
    expect(screen.queryByText(matcher('Begin Project Sign-off', 'i'))).toBeNull();

  })
})