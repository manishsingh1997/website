import React from 'react';

import '@testing-library/jest-dom';

import {render, screen} from '@testing-library/react';

import StyleBrowserWrapper from '../StyleBrowserWrapper';

global.scrollTo = jest.fn();
jest.mock('@ergeon/3d-lib/src/components/StyleBrowser/StyleBrowser', () => () => (<div/>));
describe('StyleBrowserWrapper test', () => {
  it('Should render StyleBrowserWrapper', () => {
    render(
      <StyleBrowserWrapper
        doneButtonText={'hey'}
        onClose={jest.fn}
        onDone={jest.fn}
        onLoaded={jest.fn}
        showLoadingError={jest.fn}
        zipcode={''}/>
    );
    const styleBrowser = screen.queryByTestId('style-browser');
    expect(styleBrowser).toBeInTheDocument();
  });
});
