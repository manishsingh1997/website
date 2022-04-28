import React, {useMemo} from 'react';
import filter from 'lodash/filter';
import classNames from 'classnames';
import Positions from './Position';

interface CareerProps {
  jobs: [{absolute_url: string; location: {name: string}; title: string}];
  name: string;
}

const Careers = (props: {departments: CareerProps[]}) => {
  const {departments} = props;
  const departmentList = filter(departments, (career) => career.jobs.length > 0);
  const departmentsCount = departmentList.length;

  const jobListClasses = useMemo(
    () =>
      classNames('spacing ', {
        'job-list': true,
        normal: departmentsCount > 1,
        'full-width': departmentsCount === 1,
      }),
    [departmentsCount]
  );

  return (
    <>
      {departmentList.map((department, i) => (
        <div className={jobListClasses} key={i}>
          <div className="card job-list__careers spacing after__is-12">
            <span className="h4 font-weight-600">{department.name}</span>
          </div>
          <Positions jobs={department.jobs} />
        </div>
      ))}
    </>
  );
};

export default Careers;
