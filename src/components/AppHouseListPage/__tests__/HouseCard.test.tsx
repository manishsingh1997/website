import {render, fireEvent, screen} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {mockHouseA, mockHouseB} from '../../__mocks__/mockHouses';
import HouseCard from '../HouseCard';
import * as appHouseUtils from '../../../utils/app-house';

jest.mock('@ergeon/core-components', () => ({
  ...jest.requireActual('@ergeon/core-components'),
  googleIntegration: {getGoogleLoader: jest.fn()},
}));

describe('Should test the House Card component', () => {
  test('Should check the house number and map wrapper', () => {
    const {container} = render(<HouseCard house={mockHouseA} onEdit={jest.fn()} onRemove={jest.fn()} />);
    const mapWrapper = container.getElementsByClassName('map-wrapper');
    expect(mapWrapper).toBeDefined();
  });

  test('Should not render edit and remove button when house has active order', () => {
    render(<HouseCard house={mockHouseA} onEdit={jest.fn()} onRemove={jest.fn()} />);

    const editBtn = screen.queryByRole('button', {name: /Edit/});
    const removeBtn = screen.queryByRole('button', {name: /Remove/});

    expect(editBtn).not.toBeInTheDocument();
    expect(removeBtn).not.toBeInTheDocument();
  });

  test('Should render active message when house has active order', () => {
    render(<HouseCard house={mockHouseA} onEdit={jest.fn()} onRemove={jest.fn()} />);
    const message = screen.queryByText(/Address currently has active project/gi);
    expect(message).toBeInTheDocument();
  });

  test('Should not render active message when house has not active order', () => {
    render(<HouseCard house={mockHouseB} onEdit={jest.fn()} onRemove={jest.fn()} />);
    const message = screen.queryByText(/Address currently has active project/gi);
    expect(message).not.toBeInTheDocument();
  });

  test('Should call onEdit when edit button is clicked', () => {
    const onEditFn = jest.fn();

    render(<HouseCard house={mockHouseB} onEdit={onEditFn} onRemove={jest.fn()} />);

    expect(onEditFn).toHaveBeenCalledTimes(0);

    const editBtn = screen.getByRole('button', {name: /Edit/});

    fireEvent.click(editBtn);

    expect(onEditFn).toHaveBeenCalledTimes(1);
  });

  test('Should call onRemove when remove button is clicked', () => {
    const onRemoveFn = jest.fn();

    render(<HouseCard house={mockHouseB} onEdit={jest.fn()} onRemove={onRemoveFn} />);

    expect(onRemoveFn).toHaveBeenCalledTimes(0);

    const removeBtn = screen.getByRole('button', {name: /Remove/});

    fireEvent.click(removeBtn);

    expect(onRemoveFn).toHaveBeenCalledTimes(1);
  });

  test('Should render header address when address value is valid', () => {
    render(<HouseCard house={mockHouseA} onEdit={jest.fn()} onRemove={jest.fn()} />);
    const address = screen.getByRole('heading', {name: /300 Wood Falls Ct/i, level: 5});
    expect(address).toBeInTheDocument();
  });

  test('Should not render header address when address value is null', () => {
    jest.spyOn(appHouseUtils, 'getFormattedAddress').mockImplementation(() => undefined);
    render(<HouseCard house={mockHouseA} onEdit={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.queryByText('300 Wood Falls')).not.toBeInTheDocument();
  });
});
