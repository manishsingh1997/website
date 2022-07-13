import { CatalogType } from '@ergeon/3d-lib'

export type User = {
  email: string,
  full_name: string,
  phone_number: string,
}

export type Config = {
  catalog_type: CatalogType,
  code: string,
  description: string,
  price: string,
  units: string,
  grade: string,
}
