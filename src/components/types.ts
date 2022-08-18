import {QuoteApproval} from './AppCustomerQuotePage/types';

export type HouseType = {
  id: number;
  address: HouseAddress;
  is_hidden?: boolean;
  has_active_order: boolean;
};

export type HouseAddress = {
  formatted_address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
};

export type Order = {
  id: number;
  ordered_at: string | null;
  house: HouseType;
  product: OrderProduct;
  customer_deal_status: string;
  sales_rep: OrderStaffInfo | null;
  status: string;
  status_display: string;
  project_manager: OrderStaffInfo | null;
  quotes: Quote[];
  visits: Visits[];
};

export type Quote = {
  id: number;
  title: string | null;
  sent_to_customer_at: string | null;
  total_price: string;
  total_cost: string;
  approved_at: string | null;
  cancelled_at: string | null;
  reviewed_at: string | null;
  description_html: string;
  order: Order;
  order_id: number;
  quote_lines: QuoteLine[];
  quote_approvals: QuoteApproval[];
  preview_quote_line: PreviewQuoteLine | null;
  secret: string;
  expires_at: string | null;
  total_length: string | null;
  total_area: string | null;
  status: QuoteStatus;
  is_scope_change?: boolean;
};

export type OrderProduct = {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  is_active: boolean;
};

export type QuoteStatus = {
  id: number;
  type: string;
  type_display: string;
  code: string;
  label: string;
  sequence: number;
};

export type QuoteLine = {
  id: number;
  config: QuoteLineConfig;
  property_config: null;
  label: string;
  quantity: string;
  description: string;
  unit: string;
  cost: string;
  is_quote_preview_possible: boolean;
  catalog_type: OrderType;
  display_to_customer: boolean;
  display_to_installer: boolean;
  approved_at: Date;
  quote_id: number;
  mediafile_list: null;
  price: string;
  display_price: string;
  is_dropped: boolean;
  dropped_at_quote_id: null;
  is_build_spec_available: boolean;
};

export type PreviewQuoteLine = {
  config: QuoteLineConfig;
};

export type QuoteLineConfig = {
  id: number;
  schema: string;
  code: string;
  tags: string[];
  schema_code_url: string;
};

export type OrderType = {
  item: string;
  unit: string;
  allows_unit_display: boolean;
  map_kind: string;
};

export type OrderStaffInfo = {
  id: number;
  email: string;
  full_name: string;
  phone_number: string;
};

export type Visits = {
  id: number;
  estimated_start_time: string;
};

export type Product = 'fence-replacement' | 'driveway-installation';

export type Address = {
  primary_number: string;
  street_name: string;
  city_name: string;
  state_abbreviation: string;
  zipcode: string;
  location: {
    lat: number;
    lng: number;
  };
  formatted_address: string;
  raw_address: string;
  place_types: string[];
};

export type ProductAvailability = {
  zipcode?: string;
  supported?: boolean;
  products?: {
    [key in Product]?: boolean;
  };
  market?: string;
};

export type Lead = {
  address?: Address;
  product_slug?: Product;
  productAvailability?: ProductAvailability;
  zipcode?: string;
};
