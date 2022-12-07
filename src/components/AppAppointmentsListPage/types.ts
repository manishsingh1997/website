import {HouseType} from '../types';

// TODO: Improve typing. And some of these types may be defined elsewhere
type AppointmentOrderProduct = {
  id: number,
  name: string,
  short_name: string,
  slug: string,
  is_active: boolean,
}

export type AppointmentOrder = {
  id: number,
  ordered_at: string, // It's actually a timestamp
  house: HouseType,
  product: AppointmentOrderProduct,
}

export type Appointment = {
  agent_name: string,
  date: string, // Perhaps we should use some date type
  id: number,
  order: AppointmentOrder,
  time_end: string, // Perhaps we should use some time type
  time_start: string, // Perhaps we should use some time type
  type: string,
}

export enum AppointmentsFilter {
  UPCOMING = 'Upcoming',
  PAST = 'Past',
  ALL = 'All',
}

// Already exists in erg-core-components
export type OptionType = {
  icon?: string;
  label: string;
  value: string;
  onClick?: () => void;
}
