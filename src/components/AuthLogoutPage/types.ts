export type AuthType = {
  user: {gid: string} | null,
  isUserLoggedOut: boolean,
  isAuthLoading: boolean,
  logoutError: string | null,
}
