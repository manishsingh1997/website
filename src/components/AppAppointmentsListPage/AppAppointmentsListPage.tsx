import React, {Fragment, useCallback, useContext, useMemo, useState} from 'react';
import isEmpty from 'lodash/isEmpty';

import CustomerGIDContext from '../../context-providers/CustomerGIDContext';

import AppPage from '../../components/common/AppPage';
import {filterAppointmentsByDate} from '../../utils/app-appointments';
import {HouseType} from '../types';
import {Appointment, AppointmentsFilter} from './types';
import AppointmentsList from './AppointmentsList';
import AppointmentsFilterSelector from './AppointmentsFilterSelector';
import useHouseAppointments from './useHouseAppointments';

import './AppAppointmentsListPage.scss';

export type AppAppointmentsListPageProps = {
  appointments?: Appointment[];
  getAppointments: (customerGID: number) => void;
  isListLoading: boolean;
  listError: [] | null;
  selectedHouse: HouseType | null;
};
const AppAppointmentsListPage = (props: AppAppointmentsListPageProps) => {
  const {appointments = [], getAppointments, isListLoading, listError, selectedHouse} = props;

  const customerGID = useContext(CustomerGIDContext);

  const [selectedFilter, setSelectedFilter] = useState<AppointmentsFilter>(AppointmentsFilter.UPCOMING);

  const houseAppointments = useHouseAppointments(appointments, selectedHouse);

  const haveAppointments = useMemo(() => !isEmpty(appointments), [appointments]);
  const haveHouseAppointments = useMemo(() => !isEmpty(houseAppointments), [houseAppointments]);

  const filteredAppointments = useMemo(() => {
    return filterAppointmentsByDate(houseAppointments, selectedFilter);
  }, [selectedFilter, houseAppointments]);

  const fetchData = useCallback(() => getAppointments(customerGID), [getAppointments, customerGID]);

  const renderContent = useCallback(() => {
    if (haveHouseAppointments) {
      return <AppointmentsList appointments={filteredAppointments} />;
    }
    if (haveAppointments && !haveHouseAppointments) {
      return <div className="center error"> There are no appointments for the selected house address.</div>;
    }

    return <div className="center error">There are no appointments yet.</div>;
  }, [haveAppointments, haveHouseAppointments, filteredAppointments]);

  const renderHeader = useCallback(() => {
    return (
      <Fragment>
        <div>Appointments</div>
        {haveAppointments && (
          <AppointmentsFilterSelector selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        )}
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
};

export default AppAppointmentsListPage;
