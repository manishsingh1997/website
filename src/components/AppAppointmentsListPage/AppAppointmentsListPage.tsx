import React, {Fragment, useCallback, useContext, useMemo, useState} from 'react';
import isEmpty from 'lodash/isEmpty';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import AppPage from '../../components/common/AppPage';
import {filterAppointmentsByDate} from '../../utils/app-appointments';
import {Appointment, AppointmentsFilter} from './types';
import AppointmentsList from './AppointmentsList';
import AppointmentsFilterSelector from './AppointmentsFilterSelector';

import './AppAppointmentsListPage.scss';

export type AppAppointmentsListPageProps = {
  appointments?: Appointment[],
  getAppointments: (customerGID: number) => void,
  isListLoading: boolean,
  listError: [] | null,
};
const AppAppointmentsListPage = ({
  appointments = [],
  getAppointments,
  isListLoading,
  listError,
}: AppAppointmentsListPageProps) => {
  const customerGID = useContext(CustomerGIDContext);

  const haveAppointments = useMemo(() => !isEmpty(appointments), [appointments]);
  const [selectedFilter, setSelectedFilter] = useState<AppointmentsFilter>(AppointmentsFilter.UPCOMING);

  const filteredAppointments = useMemo(() => {
    return filterAppointmentsByDate(appointments, selectedFilter)
  }, [appointments, selectedFilter]);

  const fetchData = useCallback(() => getAppointments(customerGID), [getAppointments, customerGID]);

  const renderContent = useCallback(() => {
    if (haveAppointments) {
      return <AppointmentsList appointments={filteredAppointments}/>;
    }
    return <div className="center error">There are no appointments yet.</div>;
  }, [haveAppointments, filteredAppointments]);

  const renderHeader = useCallback(() => {
    return (
      <Fragment>
        <div>Appointments</div>
        {haveAppointments && 
          <AppointmentsFilterSelector
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}/>
        }
      </Fragment>
    );
  }, [haveAppointments, selectedFilter]);

  return (
    <AppPage
      className="appointment-list-page"
      error={listError}
      fetchData={fetchData}
      isLoading={isListLoading}
      renderContent={renderContent}
      renderHeader={renderHeader}
    />
  );
}

export default AppAppointmentsListPage;
