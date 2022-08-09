import React, {useCallback, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import classNames from 'classnames';

import {Spinner} from '@ergeon/core-components';

import Careers from './Careers';

import './JobBoard.scss';

export interface JobList {
  absolute_url: string;
  department: string;
  title: string;
  jobs: [{absolute_url: string; location: {name: string}; title: string}];
  name: string;
}

const JobBoard = () => {
  const [jobList, setJobList] = useState<JobList[]>([]);
  const [loading, setloading] = useState(true);

  const getJobList = useCallback(async () => {
    try {
      const response = await axios.get('https://boards-api.greenhouse.io/v1/boards/ergeon/departments');
      setJobList(response.data.departments ?? []);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error(error);
    }
  }, [setJobList, setloading]);

  const loadingClasses = useMemo(
    () =>
      classNames({
        'loading-placeholder': true,
        visible: loading,
      }),
    [loading]
  );

  useEffect(
    function init() {
      getJobList();
    },
    [getJobList]
  );

  return (
    <div>
      <div className="section-title">
        <h2 className="center light-bold font-weight-600">Current Job Openings</h2>
      </div>
      <div className="job-board">
        <div className={loadingClasses}>
          <Spinner active={loading} color="blue" size={48} />
        </div>
        <Careers departments={jobList} />
      </div>
    </div>
  );
};

export default JobBoard;
