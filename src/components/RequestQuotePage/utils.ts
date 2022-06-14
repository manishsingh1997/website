export type Address = {
  primary_number: string;
  street_name: string;
  city_name: string;
  state_abbreviation: string;
  zipcode: string;
}

export const stringifyAddress = (address: Address) => {
  if (address !== null && address !== undefined) {
    const addressParts = [
      address.primary_number,
      address.street_name,
      address.city_name,
      address.state_abbreviation,
      address.zipcode,
    ];
    return addressParts.join(', ');
  }
  return '';

};

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = (`${phoneNumber}`).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};