export type PrimaryContact = {
  id: number;
  type?: string;
  identifier: string;
  formatted_identifier: string;
  label: string | null;
  action?: 'add' | 'edit';
  error?: string;
};

export type Contact = {
  id: number;
  full_name: string;
  relation: string;
  primary_email: PrimaryContact;
  primary_phone: PrimaryContact;
  additional_emails: PrimaryContact[];
  additional_phones: PrimaryContact[];
  is_primary: boolean;
};

export type InitialContact = {
    id?: number,
    name?: string,
    email?: string,
    phone?: string,
}

export type AdditionalContact = PrimaryContact[];
