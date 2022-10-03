import React from 'react';

import {ProjectDetailsProps} from './types';

const ProjectNotes = ({quote}: ProjectDetailsProps) => (
  <div className="quote-notes card padding-40 spacing after__is-30 page-break">
    <div className="heading-md-text">Project notes</div>
    <div className="quote-projects-notes">
      <div dangerouslySetInnerHTML={{__html: quote.description_html}} />
    </div>
  </div>
);

export default ProjectNotes;
