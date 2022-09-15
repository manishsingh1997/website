import React from 'react';

import '@testing-library/jest-dom';

import {render, screen} from '@testing-library/react';

import PopUp from '../PopUp';

global.scrollTo = jest.fn();

describe('Popup component test', () => {
  it('Should render popup component', () => {
    render(
      <PopUp onHide={jest.fn} visible={true}/>
    );
    const popup = screen.queryByTestId('popup-modal');
    expect(popup).toBeInTheDocument();
  });
});
