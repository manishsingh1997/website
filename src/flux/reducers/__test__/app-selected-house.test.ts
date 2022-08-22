import '@testing-library/jest-dom';
import {HouseActionTypes} from '../../actions/app-houses';
import selectedHouseReducer from '../app-selected-house';

const mockAction = {
  data: null,
};

describe('app selected house reducer', () => {
  it('should return SET_SELECTED_HOUSE state correctly', () => {
    expect(
      selectedHouseReducer(
        {
          data: null,
        },
        {
          ...mockAction,
          type: HouseActionTypes.SET_SELECTED_HOUSE,
          data: {
            id: 192689,
            address: {
              formatted_address: '15710 San Antonio Ave, Chino, CA 91708, USA',
              zip_code: '91708',
              latitude: 33.965634,
              longitude: -117.6592711,
            },
            is_hidden: false,
            has_active_order: false,
          },
        }
      )
    ).toEqual({
      data: {
        id: 192689,
        address: {
          formatted_address: '15710 San Antonio Ave, Chino, CA 91708, USA',
          zip_code: '91708',
          latitude: 33.965634,
          longitude: -117.6592711,
        },
        is_hidden: false,
        has_active_order: false,
      },
    });
  });
});
