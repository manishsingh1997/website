import React from 'react';

interface JobList {
  jobs: [{
      absolute_url: string;
      location: {name: string};
      title: string;
    }];
}

const Positions = (props: JobList) => {
  const {jobs} = props;
  return (
    <>
      { jobs.map((job, i) => (
        <div className="job-list__job" key={i}>
          <a href={job.absolute_url} rel="noopener noreferrer" target="_blank">
            {job.title}
          </a>
          <div className="label uppercase job-list__job__location">
            {job.location.name}
          </div>
        </div>
      ))}
    </>
  );
};

export default Positions;
