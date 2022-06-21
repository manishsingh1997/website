import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import AppContactsPage from '../index';
import ContactDataMock from '../__mocks__/ContactData';
import * as API from '../../../api/app';

describe('AppConstactPage', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('It render component when mounted', () => {
    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/full name/i)).toBeInTheDocument();
    expect(screen.getByText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByText(/^phone$/i)).toBeInTheDocument();
    expect(screen.getByText(/Additional Contacts/i)).toBeInTheDocument();

    const primaryContact = ContactDataMock.find((contact) => contact['is_primary']);
    const email = primaryContact?.primary_email.formatted_identifier;
    const phone = primaryContact?.primary_phone.formatted_identifier;

    expect(screen.getByText(email as string)).toBeInTheDocument();
    expect(screen.getByText(phone as string)).toBeInTheDocument();
  });

  test('It show contact edit form onClick edit ', () => {
    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const name = document.querySelector('#name') as HTMLInputElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const phone = document.querySelector('#phone') as HTMLInputElement;

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();

    // prefilled data in input fields
    const primaryContact = ContactDataMock.find((contact) => contact['is_primary']);
    const nameMock = primaryContact?.full_name;
    const emailMock = primaryContact?.primary_email.formatted_identifier;
    const phoneMock = primaryContact?.primary_phone.formatted_identifier;

    expect(name.value).toBe(nameMock);
    expect(email.value).toBe(emailMock);
    expect(phone.value).toBe(phoneMock);
  });

  test('It allows for edit of primary and additional contact', () => {
    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const name = document.querySelector('#name') as HTMLInputElement;
    const phone = document.querySelector('#phone') as HTMLInputElement;

    const additionalContacts = screen.getByText(/additional contacts/i);

    const additionalEmailInput = screen.getAllByTestId(/email-input/i);
    const additionalPhoneInput = screen.getAllByTestId(/phone-input/i);

    const addEmailButton = screen.getByText(/Add email field/i);
    const addPhoneButton = screen.getByText(/Add phone field/i);

    expect(additionalContacts).toBeInTheDocument();

    fireEvent.change(name, {target: {value: 'new name'}});
    fireEvent.change(phone, {target: {value: '(574) 500-3650'}});

    fireEvent.click(addEmailButton);
    fireEvent.click(addPhoneButton);

    const lastAdditionalEmail = additionalEmailInput[additionalEmailInput.length - 1] as HTMLInputElement;
    const lastAdditionalPhone = additionalPhoneInput[additionalPhoneInput.length - 1] as HTMLInputElement;

    fireEvent.change(lastAdditionalEmail, {target: {value: 'addemail.@gmail.com'}});
    fireEvent.change(lastAdditionalPhone, {target: {value: '(555) 555-5567'}});

    expect(name.value).toBe('new name');
    expect(phone.value).toBe('(574) 500-3650');
    expect(lastAdditionalEmail.value).toBe('addemail.@gmail.com');
    expect(lastAdditionalPhone.value).toBe('(555) 555-5567');
  });

  test('It removes additional contact input field', async () => {
    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const removeEmailButton = document.querySelector('.remove-Email') as HTMLButtonElement;
    const removePhoneButton = document.querySelector('.remove-Phone') as HTMLButtonElement;

    expect(removeEmailButton).toBeInTheDocument();
    expect(removePhoneButton).toBeInTheDocument();

    fireEvent.click(removeEmailButton);
    fireEvent.click(removePhoneButton);

    await waitFor(() => {
      const checkEmailButton = document.querySelector('.remove-Email') as HTMLButtonElement;
      const checkPhoneButton = document.querySelector('.remove-Phone') as HTMLButtonElement;
  
      expect(checkEmailButton).not.toBeInTheDocument();
      expect(checkPhoneButton).not.toBeInTheDocument();
    })
  });

  test('It show success when edit submitted', async () => {
    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const save = screen.getByText(/save/i);
    expect(save).toBeInTheDocument();

    fireEvent.click(save);

    await waitFor(() => {
      const successMessage = screen.getByText(/Contacts were updated successfully/i);
      expect(successMessage).toBeInTheDocument();
    });
  });
});

describe('App contact page Error', () => {
  test('It shows general error on no error data', async () => {
    jest.spyOn(API, 'updateCustomerContacts').mockImplementation(() => {
      return Promise.reject(null);
    });
    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    const editButton = screen.getByText(/Edit/i);

    fireEvent.click(editButton);

    const save = screen.getByText(/save/i);
    expect(save).toBeInTheDocument();
    fireEvent.click(save);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Unexpected error happened. Please try again/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('It shows required fied error on 400', async () => {
    jest.spyOn(API, 'updateCustomerContacts').mockImplementation(() => {
      return Promise.reject({
        response: {
          status: 400,
          statusText: 'mock',
          data: {
            additional_contacts: [],
            full_name: ['This field is required.'],
            phone_number: '555 555 5555',
          },
        },
      });
    });

    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const save = screen.getByText(/save/i);
    expect(save).toBeInTheDocument();
    fireEvent.click(save);

    await waitFor(() => {
      const errorMessage = screen.getByText(/This field is required/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('It shows general error on 404', async () => {
    jest.spyOn(API, 'updateCustomerContacts').mockImplementation(() => {
      return Promise.reject({
        response: {
          status: 404,
          statusText: 'mock',
          data: {
            additional_contacts: [],
            full_name: 'mock',
            phone_number: '555 555 5555',
          },
        },
      });
    });

    render(
      <AppContactsPage
        contacts={ContactDataMock}
        getContacts={jest.fn()}
        getCurrentUser={jest.fn()}
        isListLoading={false}
        listError={null}
        updateContacts={jest.fn()}
        updateUser={jest.fn()}
      />
    );

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const save = screen.getByText(/save/i);
    expect(save).toBeInTheDocument();
    fireEvent.click(save);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Unexpected error happened: 404 mock. Please try again/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
