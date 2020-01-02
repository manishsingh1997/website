export const parseAPIError = (error) => {
  return {
    response: error.response,
    statusCode: error.response && error.response.status,
    statusText: error.response && error.response.statusText,
    data: error.response && error.response.data,
  };
};
