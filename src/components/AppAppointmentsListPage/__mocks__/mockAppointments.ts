import {Appointment} from '../types';
import {mockHouseA, mockHouseB} from '../../__mocks__/mockHouses';

export const mockUpcomingAppointmentId = 420;
export const mockPastAppointmentId = 69;

export const mockUpcomingAppointment: Appointment = {
  agent_name: 'Brian Morris',
  date: '2050-06-13',
  id: 69,
  order: {
    id: mockUpcomingAppointmentId,
    ordered_at: '2022-04-26T00:37:39.668634-07:00',
    house: mockHouseA,
    product: {
        id: 105,
        name: 'Fence Installation',
        short_name: 'Fence',
        slug: 'fence-replacement',
        is_active: true
    }
  },
  time_start: '09:00:00',
  time_end: '17:00:00',
  type: 'Physical onsite',
};

export const mockPastAppointment: Appointment = {
  agent_name: 'Brian Morris',
  date: '1997-06-13',
  id: 420,
  order: {
    id: mockPastAppointmentId,
    ordered_at: '1996-04-26T00:37:39.668634-07:00',
    house: mockHouseB,
    product: {
        id: 105,
        name: 'Fence Installation',
        short_name: 'Fence',
        slug: 'fence-replacement',
        is_active: true
    }
  },
  time_start: '09:00:00',
  time_end: '17:00:00',
  type: 'Physical onsite',
};
