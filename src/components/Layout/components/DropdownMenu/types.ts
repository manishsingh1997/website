import {AuthUser} from '../../../../flux/reducers/auth';

export interface MenuItem {
  content: string;
  href: string;
  iconSVG: string;
  onClick?: () => void;
  special?: boolean;
  className?: string;
  isTitle?: boolean;
}

export interface user extends AuthUser {
  full_name?: string;
}

export type MenuItemProp = {
  href: string;
  iconSVG: string;
  content: string;
};

export interface MobileLogoutAndHelpSectionProps {
  menuItem: MenuItemProp;
}
