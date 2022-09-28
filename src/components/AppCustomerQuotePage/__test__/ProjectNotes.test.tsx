import React from 'react';

import {render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';
import projectsNotesQuote from '../__mocks__/data/ProjectNotes';
import ProjectNotes from '../ProjectNotes';
import {ProjectDetailsProps} from '../types';

const mockProjectNotesQuoteProps = projectsNotesQuote as ProjectDetailsProps;

describe('Project Notes', () => {
  it('Should match heading and snapshot', () => {
    const {container} = render(<ProjectNotes quote={mockProjectNotesQuoteProps.quote} />);
    expect(screen.getByText('Project notes').matches('Project notes'));
    expect(container).toMatchSnapshot();
  });
});
