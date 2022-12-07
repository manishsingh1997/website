import React from 'react';

import {render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';
import additionalApprovalsList from '../__mocks__/data/AdditionalApprovalsList';
import {quoteApprovalList} from '../types';
import AdditionalApprovalsList from '../AdditionalApprovalsList';

const mockAdditionalApprovalListProps = additionalApprovalsList as unknown as quoteApprovalList;

let isMultiPartyQuote;

describe('Additional Approvals List', () => {
  test('Should display Additional Approvals page', () => {
    render(<AdditionalApprovalsList additionalQuoteApprovals={[mockAdditionalApprovalListProps]} />);
    isMultiPartyQuote = true;
    expectAdditionalApprovalsToBeVisible();
  });

  test('Should match fullname in Additional Approvals page', () => {
    const {container} = render(
      <AdditionalApprovalsList additionalQuoteApprovals={[mockAdditionalApprovalListProps]} />
    );
    expect(screen.getByText('ammie Linton').matches(mockAdditionalApprovalListProps.customer.full_name));
    expect(container.getElementsByClassName('additional-approvers-list-item-status').length).toBe(1);

    isMultiPartyQuote = false;
  });

  test('Should component not render', () => {
    const {container} = render(
      isMultiPartyQuote && <AdditionalApprovalsList additionalQuoteApprovals={[mockAdditionalApprovalListProps]} />
    );
    expect(container.childElementCount).toEqual(0);
  });
});

const expectAdditionalApprovalsToBeVisible = () => {
  if (isMultiPartyQuote) {
    expect(screen.getByText('Additional Approvers').matches('Additional Approvers'));
  }
};
