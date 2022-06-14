export type CitiesMinData = {
  city: string,
  county: string,
  state: string,
  slug: string,
}

export type CitiesNeighboringData = {
  to_slug: string,
  to_city: string,
} & CitiesMinData;

export type CitiesJSONData = {
  cities: CitiesMinData[];
  neighboring: CitiesNeighboringData[];
}
