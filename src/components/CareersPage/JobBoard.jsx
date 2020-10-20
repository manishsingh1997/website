import React from 'react';
import axios from 'axios';
import ClassNames from 'classnames';

import {Spinner} from '@ergeon/core-components';

import './JobBoard.scss';

class JobBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      jobList: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.getJobList();
  }
  getJobList() {
    axios.get('https://boards-api.greenhouse.io/v1/boards/ergeon/departments')
      .then((response) => {
        this.setState({jobList: response.data, loading: false});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderPositions(jobs) {
    return (
      jobs.map((job, i) => {
        return (
          <div className="job-list__job" key={i}>
            <a href={job.absolute_url} rel="noopener noreferrer" target="_blank">{job.title}</a>
            <div className="label uppercase">{job.location.name}</div>
          </div>
        );
      })
    );
  }
  renderDepartments() {
    const {jobList} = this.state;
    if (jobList.departments) {
      const departments = jobList.departments;
      const departmentCount = departments.filter(department => department.jobs.length > 0).length;
      const jobListClasses = ClassNames({
        'job-list': true,
        'normal': departmentCount > 1,
        'full-width': departmentCount === 1,
      });
      return (
        departments.map((department, i) => {
          if (department.jobs.length) {
            return (
              <div className={jobListClasses} key={i}>
                <div className="card job-list__department">
                  <span className="additional-header h2">{department.name}</span>
                </div>
                {this.renderPositions(department.jobs)}
              </div>
            );
          }
          return null;
        })
      );
    }
  }

  render() {
    const {loading} = this.state;
    const loadingClasses = ClassNames({
      'loading-placeholder': true,
      'visible': loading,
    });
    return (
      <div>
        <div className="section-title">
          <h2 className="center">Current Job Openings</h2>
        </div>
        <div className="cards two-columns job-board">
          <div className={loadingClasses}>
            <Spinner active={loading} color="green" size={48} />
          </div>
          {this.renderDepartments()}
        </div>
      </div>
    );
  }
}

export default JobBoard;
