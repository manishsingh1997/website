import '@testing-library/jest-dom';
import {HouseActionTypes} from '../../actions/app-houses';
import housesReducer from '../app-houses';

const mockAction = {
  data: [],
  error: {
    nonFieldErrors: [''],
  },
};

describe('app houses reducer', () => {
  it('should return GET_HOUSES_START state correctly', () => {
    expect(
      housesReducer(
        {
          data: null,
          isListLoading: false,
          isPopupOpen: false,
          isSuccessfullyRemoved: false,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.GET_HOUSES_START}
      )
    ).toEqual({data: null, isListLoading: true, isPopupOpen: false, isSuccessfullyRemoved: false, listError: null});
  });
  it('should return GET_HOUSES_DONE state correctly', () => {
    expect(
      housesReducer(
        {
          data: null,
          isListLoading: true,
          isPopupOpen: false,
          isSuccessfullyRemoved: false,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.GET_HOUSES_DONE}
      )
    ).toEqual({data: [], isListLoading: false, isPopupOpen: false, isSuccessfullyRemoved: false, listError: null});
  });
  it('should return ADD_HOUSE_START state correctly', () => {
    expect(
      housesReducer(
        {
          data: [],
          isListLoading: false,
          isPopupOpen: false,
          isSuccessfullyRemoved: true,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.ADD_HOUSE_START}
      )
    ).toEqual({data: [], isListLoading: true, isPopupOpen: true, isSuccessfullyRemoved: true, listError: null});
  });
  it('should return ADD_HOUSE_DONE state correctly', () => {
    expect(
      housesReducer(
        {
          data: [],
          isListLoading: true,
          isPopupOpen: true,
          isSuccessfullyRemoved: true,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.ADD_HOUSE_DONE}
      )
    ).toEqual({data: [[]], isListLoading: false, isPopupOpen: false, isSuccessfullyRemoved: true, listError: null});
  });
  it('should return EDIT_HOUSE_START state correctly', () => {
    expect(
      housesReducer(
        {
          data: [
            {
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
          ],
          isListLoading: false,
          isPopupOpen: false,
          isSuccessfullyRemoved: true,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.EDIT_HOUSE_START}
      )
    ).toEqual({
      data: [
        {
          address: {
            formatted_address: '15710 San Antonio Ave, Chino, CA 91708, USA',
            latitude: 33.965634,
            longitude: -117.6592711,
            zip_code: '91708',
          },
          has_active_order: false,
          id: 192689,
          is_hidden: false,
        },
      ],
      isListLoading: true,
      isPopupOpen: true,
      isSuccessfullyRemoved: true,
      listError: null,
    });
  });
  it('should return EDIT_HOUSE_DONE state correctly', () => {
    expect(
      housesReducer(
        {
          data: [
            {
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
          ],
          isListLoading: true,
          isPopupOpen: true,
          isSuccessfullyRemoved: true,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.EDIT_HOUSE_DONE}
      )
    ).toEqual({
      data: [
        {
          address: {
            formatted_address: '15710 San Antonio Ave, Chino, CA 91708, USA',
            latitude: 33.965634,
            longitude: -117.6592711,
            zip_code: '91708',
          },
          has_active_order: false,
          id: 192689,
          is_hidden: false,
        },
      ],
      isListLoading: false,
      isPopupOpen: false,
      isSuccessfullyRemoved: true,
      listError: null,
    });
  });
  it('should return REMOVE_HOUSE_START state correctly', () => {
    expect(
      housesReducer(
        {
          data: [
            {
              id: 192689,
              address: {
                formatted_address: '1475 Akron Way, Forney, TX 75126, USA',
                zip_code: '75126',
                latitude: 32.7363374,
                longitude: -96.4151262,
              },
              is_hidden: false,
              has_active_order: false,
            },
          ],
          isListLoading: false,
          isPopupOpen: false,
          isSuccessfullyRemoved: true,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.REMOVE_HOUSE_START}
      )
    ).toEqual({
      data: [
        {
          address: {
            formatted_address: '1475 Akron Way, Forney, TX 75126, USA',
            latitude: 32.7363374,
            longitude: -96.4151262,
            zip_code: '75126',
          },
          has_active_order: false,
          id: 192689,
          is_hidden: false,
        },
      ],
      isListLoading: false,
      isPopupOpen: false,
      isSuccessfullyRemoved: false,
      listError: null,
    });
  });
  it('should return REMOVE_HOUSE_DONE state correctly', () => {
    expect(
      housesReducer(
        {
          data: [
            {
              id: 192689,
              address: {
                formatted_address: '1475 Akron Way, Forney, TX 75126, USA',
                zip_code: '75126',
                latitude: 32.7363374,
                longitude: -96.4151262,
              },
              is_hidden: false,
              has_active_order: false,
            },
          ],
          isListLoading: false,
          isPopupOpen: false,
          isSuccessfullyRemoved: true,
          listError: null,
        },
        {...mockAction, type: HouseActionTypes.REMOVE_HOUSE_DONE}
      )
    ).toEqual({
      data: [
        {
          address: {
            formatted_address: '1475 Akron Way, Forney, TX 75126, USA',
            latitude: 32.7363374,
            longitude: -96.4151262,
            zip_code: '75126',
          },
          has_active_order: false,
          id: 192689,
          is_hidden: false,
        },
      ],
      isListLoading: false,
      isPopupOpen: false,
      isSuccessfullyRemoved: true,
      listError: null,
    });
  });
});
