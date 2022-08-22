import React, {Dispatch, useMemo} from 'react';

import {SelectFilter} from '@ergeon/core-components';

import {APPOINTMENT_FILTER_OPTIONS, getFilterOption} from '../../../utils/app-appointments';
import {AppointmentsFilter, OptionType} from '../types';

type AppointmentsFilterSelectorProps = {
  selectedFilter: AppointmentsFilter;
  setSelectedFilter: Dispatch<AppointmentsFilter>;
}
const AppointmentsFilterSelector = ({
  selectedFilter,
  setSelectedFilter,
}: AppointmentsFilterSelectorProps) => {
  const value = useMemo(() => getFilterOption(selectedFilter), [selectedFilter]);

  const handleChange = (selectedOption: OptionType) => {
    let newFilter: AppointmentsFilter | undefined;
    switch (selectedOption.value) {
      case AppointmentsFilter.UPCOMING:
        newFilter = AppointmentsFilter.UPCOMING;
        break;
      case AppointmentsFilter.PAST:
        newFilter = AppointmentsFilter.PAST;
        break;
      case AppointmentsFilter.ALL:
        newFilter = AppointmentsFilter.ALL;
        break;
      default:
        throw new Error('Selected filter not recognized.');
    }
    setSelectedFilter(newFilter);
  };

  return (
    <div className="appointment-filters" data-testid="appointment-filters" >
      <SelectFilter
        className="react-select-filter-container"
        classNamePrefix="react-select-filter"
        name="appointment_filter"
        onChange={handleChange}
        options={APPOINTMENT_FILTER_OPTIONS}
        value={value}
      />
    </div>
  );
}

export default AppointmentsFilterSelector;
