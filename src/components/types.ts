export type HouseType = {
  id: number,
  address?: HouseAddress,
}

export type HouseAddress = {
  formatted_address: string,
  zip_code: string,
  latitude: number,
  longitude: number,
}
