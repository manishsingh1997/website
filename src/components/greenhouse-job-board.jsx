import './greenhouse-job-board.scss';
import React from 'react';
import axios from 'axios';
import Spinner from './spinner';
import ClassNames from 'classnames';
class JobBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      jobList: [],
      loader: true,
    };
  }
  componentDidMount() {
    this.getJobList();
  }
  getJobList() {
    axios.get('https://boards-api.greenhouse.io/v1/boards/ergeon/departments')
      .then((response) => {
        this.setState({jobList: response.data, loader: false});
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
      let departmentCount = 0;
      departments.map(department => {
        if (department.jobs.length > 0) departmentCount++;
        return null;
      });
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
                <div className="job-list__department">
                  <h4 className="additional-header h4">{department.name}</h4>
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
    const {loader} = this.state;
    const loaderClasses = ClassNames({
      'loader-placeholder': true,
      'visible': loader,
    });
    return (
      <div>
        <div className="section-title">
          <h2 className="center">Current Job Openings</h2>
        </div>
        <div className="job-board">
          <div className={loaderClasses}>
            <Spinner active={loader} color="green" size={48}/>
          </div>
          {this.renderDepartments()}
        </div>
      </div>
    );
  }
}

export default JobBoard;