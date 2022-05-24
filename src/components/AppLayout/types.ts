import {ReactNode} from 'react';
import {AuthType} from '../AuthLogoutPage/types';

interface MatchParams {
  customerGid: string;
}

export interface MatchProps {
  url: string;
  params: MatchParams;
}

export type AppLayoutProps = {
  auth: AuthType;
  location: Location;
  children?: ReactNode;
  match: MatchProps;
};
