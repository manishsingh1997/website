import React from 'react';

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Careers from '../JobBoard/Careers';
import jobList from '../__mock__/jobList';

describe('Render Careers component', () => {
  it('should render the correctly classnames', () => {
    const {container} = render(<Careers departments={jobList} />);
    expect(container.querySelector('.spacing.job-list.normal')).toBeInTheDocument();
    expect(container.querySelector('.job-list__careers')).toBeInTheDocument();
  });
  it('should render the positions', () => {
    render(<Careers departments={jobList} />);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Data Engineer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Javascript Engineer')).toBeInTheDocument();
    expect(screen.getByText('Senior Backend Developer')).toBeInTheDocument();
    expect(screen.getByText('Senior Fullstack Engineer')).toBeInTheDocument();
    expect(screen.getByText('Staff Software Engineer')).toBeInTheDocument();
  });
});
