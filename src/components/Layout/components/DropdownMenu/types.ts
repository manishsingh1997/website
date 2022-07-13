import {AuthUser} from '../../../../flux/reducers/auth';

export interface MenuItem {
  content: string;
  href: string;
  iconSVG: string;
  onClick?: () => void;
  special?: boolean;
}

export interface user extends AuthUser {
  full_name?: string;
}
