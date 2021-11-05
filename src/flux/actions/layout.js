export const actionTypes = {
  'SET_PDF_HEADER_PHONE': 'SET_PDF_HEADER_PHONE',
};

export const setPDFHeaderPhoneNumber = (phoneNumber) => ({
  type: actionTypes.SET_PDF_HEADER_PHONE,
  payload: phoneNumber,
});
