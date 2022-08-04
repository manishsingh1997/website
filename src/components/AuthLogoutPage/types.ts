export type AuthUser = {
  gid: string,
  full_name?: string
}

export type AuthType = {
  user: AuthUser | null,
  isUserLoggedOut: boolean,
  isAuthLoading: boolean,
  logoutError: string | null,
  isUserLoading: boolean,
  userError: string | null
}

export type AuthLogoutPageProps = {
  auth: AuthType,
  logout: () => void,
}
