export const prepareQuoteApprovalLines = quoteApprovalLines => {
  return quoteApprovalLines.map(quoteApprovalLine => {
    return {
      ...quoteApprovalLine['quote_line'],
      price: quoteApprovalLine['price'],
      percent: quoteApprovalLine['percent'],
    };
  });
};
