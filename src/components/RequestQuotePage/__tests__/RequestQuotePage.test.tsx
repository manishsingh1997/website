import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {fireEvent, render, screen} from '@testing-library/react';
import RequestQuotePage from '../index';
import {addressData, leadData, selectedConfigs} from '../__mocks__/mockData';
import {mockLoggedInAuth} from '../../AuthLogoutPage/__mocks__/mockAuth';
import {store} from '../../__mocks__/mockStore';

const props = {
  addConfig: jest.fn,
  address: addressData.formatted_address,
  auth: mockLoggedInAuth,
  changeProduct: jest.fn,
  configs: selectedConfigs,
  lead: leadData,
  openAddressUpdatePopup: jest.fn,
  product: 'fence-replacement',
  updateLeadAndConfig: jest.fn,
  updateLeadFromAddress: jest.fn,
  updateProduct: jest.fn,
  zipcode: addressData.zipcode,
};

jest.mock('@ergeon/core-components', () => ({
  ...jest.requireActual('@ergeon/core-components'),
  googleIntegration: {getGoogleLoader: jest.fn()},
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/request-quote',
  }),
  useHistory: jest.fn().mockReturnValue({}),
}));

jest.mock('../../../utils/analytics', () => ({
  ...jest.requireActual('../../../utils/analytics'),
  trackError: jest.fn,
  track: jest.fn,
}));

const newStore = {...store, getState: () => ({address: addressData, cart: {configs: selectedConfigs}})};

describe('RequestQuotePage', () => {
  it('Should render RequestQuotePage', () => {
    render(
      <Provider store={newStore}>
        <Router history={createMemoryHistory()}>
          <RequestQuotePage {...props} />
        </Router>
      </Provider>
    );

    const header = screen.queryByTestId('supported-zipcode-notification');
    expect(header).toBeInTheDocument();

    const addressInfo = screen.queryByTestId('signup-map');
    expect(addressInfo).toBeInTheDocument();

    const streetAddress = screen.queryByTestId('signup-map-street-address');
    expect(streetAddress).toHaveTextContent('12 Palo Alto Ave');

    const cityAddress = screen.queryByTestId('signup-map-city-address');
    expect(cityAddress).toHaveTextContent('Palo Alto, CA 94301, USA');

    const mapComponent = screen.queryByTestId('map-component');
    expect(mapComponent).toBeInTheDocument();

    const mobileAddressField = screen.queryByTestId('mobile-address-field');
    expect(mobileAddressField).toBeInTheDocument();

    const configCart = screen.queryByTestId('config-cart');
    expect(configCart).toBeInTheDocument();

    const footer = screen.queryByTestId('footer-component');
    expect(footer).toBeInTheDocument();
  });

  test('Should show loader when fetching user data', () => {
    const newProps = {
      ...props,
      auth: {
        ...mockLoggedInAuth,
        isAuthLoading: true,
        isUserLoading: true,
      },
    };

    render(
      <Provider store={newStore}>
        <Router history={createMemoryHistory()}>
          <RequestQuotePage {...newProps} />
        </Router>
      </Provider>
    );

    const testId = screen.queryByTestId('loader-image');
    expect(testId).toBeInTheDocument();
  });

  it('Should not show ConfigCart', () => {
    const newProps = {...props, configs: []};
    render(
      <Provider store={newStore}>
        <Router history={createMemoryHistory()}>
          <RequestQuotePage {...newProps} />
        </Router>
      </Provider>
    );
    const configCart = screen.queryByTestId('config-cart');
    expect(configCart).not.toBeInTheDocument();
  });

  it('Should render no lead notification', () => {
    const newProps = {...props, configs: [], lead: null};
    render(
      <Provider store={newStore}>
      <Router history={createMemoryHistory()}>
        <RequestQuotePage {...newProps} />
      </Router>
    </Provider>
    );
    const noLeadNotification = screen.queryByTestId('no-lead-notification');
    expect(noLeadNotification).toBeInTheDocument();
  });

  it('Should render not supported area notification', () => {
    const newProps = {
      ...props,
      configs: [],
      lead: {...leadData, productAvailability: null},
    };
    render(
      <Provider store={newStore}>
        <Router history={createMemoryHistory()}>
          <RequestQuotePage {...newProps} />
        </Router>
      </Provider>
    );
    const notSupportedZipcodeNotification = screen.queryByTestId('not-supported-zipcode-notification');
    expect(notSupportedZipcodeNotification).toBeInTheDocument();
  });

  it('Should trigger updateAddress on props change', async () => {
    const updateLeadFromAddress = jest.fn();
    const newProps = {
      ...props,
      address: '',
      updateLeadFromAddress,
      configs: [],
      lead: {...leadData, productAvailability: null},
    };
    const {rerender} = render(
      <Provider store={newStore}>
        <Router history={createMemoryHistory()}>
          <RequestQuotePage {...newProps} />
        </Router>
      </Provider>
    );
    expect(updateLeadFromAddress).not.toBeCalled();

    const updatedProps = {
      ...newProps,
      auth: {
        ...mockLoggedInAuth,
        user: {
          ...mockLoggedInAuth.user,
          main_address: {
            formatted_address: addressData.formatted_address,
          },
        },
      },
    };

    rerender(
      <Provider store={newStore}>
        <Router history={createMemoryHistory()}>
          <RequestQuotePage {...updatedProps} />
        </Router>
      </Provider>
    );

    expect(updateLeadFromAddress).toBeCalled();
  });

  it('Should open popup on click', async () => {
    render(
      <Provider store={newStore}>
        <Router history={createMemoryHistory()}>
          <RequestQuotePage {...props} />
        </Router>
      </Provider>
    );
    expect(screen.queryByTestId('popup-modal')).toBeNull();
    expect(screen.queryByTestId('style-browser')).toBeNull();

    fireEvent.click(screen.getByTestId('design-fence-gate-btn'));

    const popupModal = screen.getByTestId('popup-modal');
    expect(popupModal).toBeInTheDocument();

    const styleBrowser = screen.getByTestId('style-browser');
    expect(styleBrowser).toBeInTheDocument();
  });
});
