import React, {useCallback, useMemo} from 'react';

import {OptimizedImage} from '@ergeon/core-components';

import {getAsset, getProjectGalleryUrl} from './utils';
import {City} from './types';

type ProjectsCompletedProps = {
  city: string;
  projects?: City['projects'];
};

const ProjectsCompleted = (props: ProjectsCompletedProps) => {
  const {city, projects} = props;

  const renderProjectItem = useCallback((project, idx) => {
    const projectURL = getProjectGalleryUrl(project.url);
    return (
      <div className="flex-spacer RecentProjects-project" key={`project-${idx}`}>
        <a href={projectURL}>
          <OptimizedImage
            alt={project.label}
            isProcessEnvTest={process.env.NODE_ENV === 'test'}
            src={getAsset(project.img, 'jpeg')}
          />
        </a>
        <div className="RecentProjects-projectCaption">
          <a href={projectURL}>
            <span>{project.label}</span>
          </a>
        </div>
      </div>
    );
  }, []);

  const projectItems = useMemo(() => {
    return projects?.map(renderProjectItem);
  }, [projects, renderProjectItem]);

  if (!projects) {
    return null;
  }

  return (
    <section className="wrapper-1180 RecentProjects">
      <h2 className="h3">Projects Recently Completed in {city}</h2>
      <div className="flex-wrapper RecentProjects-container">{projectItems}</div>
    </section>
  );
};

export default ProjectsCompleted;
