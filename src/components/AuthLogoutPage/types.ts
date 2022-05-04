export type AuthType = {
  user: {gid: string} | null,
  isUserLoggedOut: boolean,
  isAuthLoading: boolean,
  logoutError: string | null,
}

export type AuthLogoutPageProps = {
  auth: AuthType,
  logout: () => void,
}
