import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as Sentry from '@sentry/browser';

import ContactUs from '../../ContactUsPage/index';
import * as Utils from '../../../utils/analytics';
import * as API from '../../../api/contactUs';

import {correctInputField, inputFields, pageText, wrongInputField} from '../__mocks__/data';
import submitContactUs from '../__mocks__/SubmitContactUs';

type InputFields = Array<keyof typeof inputFields>;

const matcher = (string: string, options: string) => new RegExp(string, options);

jest.mock('../CitySearchInputField.tsx');

describe('ContactUs page', () => {
  beforeAll(() => {
    jest.spyOn(API, 'submitContactUs').mockImplementation(submitContactUs);
    jest.spyOn(Utils, 'trackError');
    jest.spyOn(Sentry, 'addBreadcrumb');

    jest.spyOn(console, 'warn').mockImplementation((arg) => arg);
    jest.spyOn(console, 'error').mockImplementation((arg) => arg);
    jest.spyOn(console, 'info').mockImplementation((arg) => arg);
  });

  afterAll(() => {
    jest.restoreAllMocks()
  });

  test('Submit button when clicked displays success', async () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(inputFields.email.placeHolder);
    const nameInput = screen.getByPlaceholderText(inputFields.name.placeHolder);
    const messageInput = screen.getByPlaceholderText(inputFields.message.placeHolder);
    const cityInput = screen.getByPlaceholderText(/enter city/i);

    fireEvent.change(emailInput, {target: {value: 'testemail@ergeon.com'}});
    fireEvent.change(nameInput, {target: {value: 'test joe'}});
    fireEvent.change(messageInput, {target: {value: 'Thank you'}});
    fireEvent.change(cityInput, {target: {value: 'california'}});

    const SubmitButton = screen.getByText(matcher('submit', 'i'));

    fireEvent.click(SubmitButton);

    await waitFor(() => {
      const successHeaderNode = screen.getByText(matcher('We’ll be in touch shortly', 'i'));
      const successMessageNode = screen.getByText(matcher('Our team will reach out within 24 hours', 'i'));
      expect(successHeaderNode).toBeInTheDocument();
      expect(successMessageNode).toBeInTheDocument();
    });
  });

  test('When it renders it shows all text description', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

    pageText.forEach(function textAssertion({text}) {
      const actual = matcher(text, 'gi');
      const node = screen.getByText(actual);

      expect(node).toBeInTheDocument();
    });
  });

  test('Input and textarea fields are rendered on page', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );
    const inputs = Object.keys(inputFields) as InputFields;

    inputs.forEach(function textAssertion(input) {
      const {placeHolder, label} = inputFields[input];
      const labelNode = screen.getByText(matcher(label, 'i'));
      const inputNode = screen.getByPlaceholderText(matcher(placeHolder, 'i'));

      expect(labelNode).toBeInTheDocument();
      expect(inputNode).toBeInTheDocument();
    });
  });

  test('Input shows error if no text character match its field and submit disabled', async () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

    wrongInputField.forEach(async function inputAssertion(input) {
      const inputType = Object.keys(input) as InputFields;
      const inputNode = screen.getByPlaceholderText(inputFields[inputType[0]]?.placeHolder);

      fireEvent.change(inputNode, {target: {value: input[inputType[0]]}});
      await waitFor(() => {
        fireEvent.blur(inputNode);
        const ErrorMessage = screen.getByText(inputFields[inputType[0]].errorMessage);
        const SubmitButton = screen.getByText('Submit');

        expect(ErrorMessage).toBeInTheDocument();
        expect(SubmitButton).toBeDisabled();
      });
    });
  });

  test('Input shows no error when text character matches its field', async () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

    correctInputField.forEach(async function inputAssertion(input) {
      const inputType = Object.keys(input) as InputFields;
      const inputNode = screen.getByPlaceholderText(inputFields[inputType[0]].placeHolder);

      fireEvent.change(inputNode, {target: {value: input[inputType[0]]}});
      await waitFor(() => {
        fireEvent.blur(inputNode);
        const ErrorMessage = screen.getByText(inputFields[inputType[0]].errorMessage);

        expect(ErrorMessage).toBeNull();
        expect(inputNode).toBeInTheDocument();
      });
    });
  });

  test('Correct inputs enable submit Button', async () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText<HTMLInputElement>(matcher(inputFields.email.placeHolder, 'i'));
    const nameInput = screen.getByPlaceholderText<HTMLInputElement>(matcher(inputFields.name.placeHolder, 'i'));
    const messageInput = screen.getByPlaceholderText<HTMLInputElement>(matcher(inputFields.message.placeHolder, 'i'));

    fireEvent.change(emailInput, {target: {value: 'testemail@ergeon.com'}});
    fireEvent.change(nameInput, {target: {value: 'test joe'}});
    fireEvent.change(messageInput, {target: {value: 'Thank you'}});

    await waitFor(() => {
      const SubmitButton = screen.getByText('Submit');
      expect(emailInput.getAttribute('value')).toMatch(/testemail@ergeon.com/i);
      expect(nameInput.getAttribute('value')).toMatch(/test joe/i);
      expect(messageInput.textContent).toMatch(/Thank you/i);
      expect(SubmitButton).toBeEnabled();
    });
  });

  test('When Help center is clicked it routes to link', () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');

    render(
      <Router history={history}>
        <ContactUs />
      </Router>
    );

    const link = screen.getByText(matcher('Help center', 'i'));
    fireEvent.click(link);

    expect(pushSpy).toHaveBeenCalledWith('/help');
    pushSpy.mockReset();
  });
});
