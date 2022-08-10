import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Button} from '@ergeon/core-components';
import MobileBottomPanel from '../MobileBottomPanel';

describe('MobileBottomPanel', () => {
  it('should be able to render inner quote button', () => {
    render(
      <MobileBottomPanel>
        <Button
          flavor="primary"
          onClick={jest.fn}
          size="large"
          taste="solid">
          Get a quote
        </Button>
      </MobileBottomPanel>
    );

    const button = screen.getByText('Get a quote');
    expect(button).toBeDefined();
  });
});