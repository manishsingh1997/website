export type HouseType = {
  id: number,
  address: {
    formatted_address: string,
    zip_code: string,
    latitude: number,
    longitude: number,
  }
}
