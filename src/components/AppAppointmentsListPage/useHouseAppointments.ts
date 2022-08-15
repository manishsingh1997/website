import {useCallback, useEffect, useState} from 'react';
import {HouseType} from '../types';
import {Appointment} from './types';

const useHouseAppointments = (appointments: Appointment[], selectedHouse: HouseType | null) => {
  const [houseAppointments, setHouseAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    if (selectedHouse?.id) {
      onSelectedHouseChange();
    }
  }, [selectedHouse?.id]);

  const onSelectedHouseChange = useCallback(() => {
    const filteredAppointments = appointments?.filter(
      (appointment) => appointment?.order?.house?.id === selectedHouse?.id
    );
    setHouseAppointments(filteredAppointments);
  }, [appointments, selectedHouse]);

  return houseAppointments;
};

export default useHouseAppointments;
