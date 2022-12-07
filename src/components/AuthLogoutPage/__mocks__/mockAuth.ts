import {AuthType} from '../types';

export const mockLoggedInAuth: AuthType = {
  user: {gid: 'iemoopheebii0Eet'},
  isUserLoggedOut: false,
  isAuthLoading: false,
  isUserLoading: false,
  logoutError: null,
  userError: null
};

export const mockLoggedOutAuth: AuthType = {
  user: {gid: 'iemoopheebii0Eet'},
  isUserLoggedOut: true,
  isAuthLoading: false,
  isUserLoading: false,
  logoutError: null,
  userError: null
};

export const mockNotLoggedInAuth: AuthType = {
  user: null,
  isUserLoggedOut: false,
  isAuthLoading: false,
  isUserLoading: false,
  logoutError: null,
  userError: null
};
