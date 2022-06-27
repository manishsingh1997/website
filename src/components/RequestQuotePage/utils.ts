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
