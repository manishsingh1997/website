import {ReactNode} from 'react';

import {Address, Config, Lead, User} from '../../types';

export type LeadFormProps = {
  configs: Config[];
  lead: Lead | null;
  mobileAddressField: ReactNode;
  onAddConfigClick: () => void;
  onProductChange: (value: string) => void;
  onSubmit: () => void;
  product: string;
  user: User | null;
};

export type LeadFormData = {
  email: string;
  name: string;
  phone: string;
  comment: string;
  product: string;
  string_address: string;
  is_subscribed_to_news: boolean;
  address?: Address;
};
