export const getFormattedAddress = (houseData) => {
  return houseData['address'] && houseData['address']['formatted_address'];
};
