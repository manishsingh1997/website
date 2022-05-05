import { HouseType } from '../types';

// We might have to properly adjust and maybe include as global types
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
  id: number;
  type: string;
  type_display: string;
  code: string;
  label: string;
  sequence: number;
}

export type Quote = {
  id: number;
  title: null;
  sent_to_customer_at: null;
  total_price: string;
  total_cost: string;
  approved_at: null;
  cancelled_at: null;
  reviewed_at: null;
  description_html: string;
  order_id: number;
  quote_lines: unknown[];
  preview_quote_line: null;
  secret: string;
  expires_at: null;
  total_length: string;
  total_area: string;
  status: Status;
}

export type Order = {
  id: number,
  ordered_at: string,
  house: HouseType,
  product: OrderProduct,
  customer_deal_status: string,
  sales_rep: OrderStaffInfo | null,
  status: string,
  status_display: string,
  project_manager: OrderStaffInfo | null,
  quotes: Quote[],
  visits: string[],
}
