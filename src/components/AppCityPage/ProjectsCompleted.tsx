import React from 'react';
import { getAsset } from './utils';

import { City } from './types';

type ProjectsCompletedProps = {
  city: string,
  projects?: City['projects'];
}

const ProjectsCompleted = (props: ProjectsCompletedProps) => {
  const { city, projects } = props;

  if (!projects) {
    return null;
  }
  return (
    <section className="wrapper-1180 RecentProjects">
      <h2 className="h3">Projects Recently Completed in {city}</h2>
      <div className="flex-wrapper RecentProjects-container">
        {projects.map((project, idx) => (
          <div className="flex-spacer RecentProjects-project" key={`project-${idx}`}>
            <a href={project.url}>
              <img alt={project.label} src={getAsset(project.img, 'jpeg')} />
            </a>
            <div className="RecentProjects-projectCaption">
              <a href={project.url}>
                <span>{project.label}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsCompleted;
