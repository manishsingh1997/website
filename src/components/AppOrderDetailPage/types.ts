import { HouseType } from '../types';

export type OrderProduct = {
  id: number,
  name: string,
  short_name: string,
  slug: string,
  is_active: boolean,
}

export type OrderStaffInfo = {
  id: number,
  email: string,
  full_name: string,
  phone_number: string,
}

export type Status = {
  id: number,
  type: string,
  type_display: string,
  code: string,
  label: string,
  sequence: number,
}

export type QuoteLine = {
  id: number,
  config: QuoteLineConfig,
  property_config: null,
  label: string,
  quantity: string,
  description: string,
  unit: string,
  cost: string,
  is_quote_preview_possible: boolean,
  catalog: QuoteLineCatalog,
  display_to_customer: boolean,
  display_to_installer: boolean,
  approved_at: Date,
  quote_id: number,
  mediafile_list: null,
  price: string,
  display_price: string,
  is_dropped: boolean,
  dropped_at_quote_id: null,
  is_build_spec_available: boolean,
}

export type QuoteLineCatalog = {
  name: string,
  type: Type,
}

export type Type = {
  item: string,
  unit: string,
  allows_unit_display: boolean,
  map_kind: string,
}

export type QuoteLineConfig = {
  id: number,
  schema: string,
  code: string,
  tags: string[],
  schema_code_url: string,
}

export type PreviewQuoteLine = {
  config: QuoteLineConfig,
}

export type Quote = {
  id: number,
  title: string | null,
  sent_to_customer_at: string | null,
  total_price: string,
  total_cost: string,
  approved_at: string | null,
  cancelled_at: string | null,
  reviewed_at: string | null,
  description_html: string,
  order_id: number,
  quote_lines: QuoteLine[],
  preview_quote_line: PreviewQuoteLine | null,
  secret: string,
  expires_at: string | null,
  total_length: string | null,
  total_area: string | null,
  status: Status,
}

export type Visits = {
  id: number,
  estimated_start_time: string,
}

export type Order = {
  id: number,
  ordered_at: string | null,
  house: HouseType,
  product: OrderProduct,
  customer_deal_status: string,
  sales_rep: OrderStaffInfo | null,
  status: string,
  status_display: string,
  project_manager: OrderStaffInfo | null,
  quotes: Quote[],
  visits: Visits[],
}
