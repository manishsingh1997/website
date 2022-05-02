import {render, fireEvent, screen} from '@testing-library/react';
import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import AppAppointmentsListPage from '../index';
import {
  mockUpcomingAppointment,
  mockPastAppointment,
  mockUpcomingAppointmentId,
  mockPastAppointmentId
} from '../__mocks__/mockAppointments';

const areAppointmentsOnScreen = (ids: number[]) => {
  ids.forEach(id => {
    const order = screen.queryByText(`Fence Installation #${id}`);
    expect(order).not.toBeNull();
  });
}

describe('Rendering of App Appointments List Page', () => {
  it('should render component loading', () => {
    render(
      <AppAppointmentsListPage
        appointments={[]}
        getAppointments={jest.fn}
        isListLoading={true}
        listError={null}
      />
    );
    const title = screen.queryByText('Appointments');
    const loader = screen.queryByTestId('loader-image');

    expect(title).not.toBeNull();
    expect(loader).not.toBeNull();
  });

  it('should render component with empty list', () => {
    render(
      <AppAppointmentsListPage
        appointments={[]}
        getAppointments={jest.fn}
        isListLoading={false}
        listError={null}
      />
    );
    const title = screen.queryByText('Appointments');
    const loader = screen.queryByTestId('loader-image');
    const text = screen.queryByText('There are no appointments yet.');

    expect(title).not.toBeNull();
    expect(loader).toBeNull();
    expect(text).not.toBeNull();
  });

  it('should render component with some appointments', () => {
    render(
      <Router history={createMemoryHistory()}>
        <AppAppointmentsListPage
          appointments={[mockUpcomingAppointment, mockPastAppointment]}
          getAppointments={jest.fn}
          isListLoading={false}
          listError={null}
        />
      </Router>
    );
    const title = screen.queryByText('Appointments');
    const loader = screen.queryByTestId('loader-image');
    const text = screen.queryByText('There are no appointments yet.');

    expect(title).not.toBeNull();
    expect(loader).toBeNull();
    expect(text).toBeNull();

    const [dropDown, upcomingSelect] = screen.getAllByText('Upcoming');
    const pastSelect = screen.getByText('Past');
    const allSelect = screen.getByText('All');

    fireEvent.click(dropDown);
    fireEvent.click(pastSelect);
    areAppointmentsOnScreen([mockPastAppointmentId]);

    fireEvent.click(dropDown);
    fireEvent.click(upcomingSelect);
    areAppointmentsOnScreen([mockUpcomingAppointmentId]);

    fireEvent.click(dropDown);
    fireEvent.click(allSelect);
    areAppointmentsOnScreen([mockUpcomingAppointmentId, mockPastAppointmentId]);
  });
});
