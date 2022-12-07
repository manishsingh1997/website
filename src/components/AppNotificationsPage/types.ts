type NotificationCustomData = {
  id: number;
  type: string;
  identifier: string;
  formatted_identifier: string;
  label: string | null;
};

export type Location = {
  pathname: string;
  search: string;
};

export type AppNotificationsProps = {
  location: Location;
};

export type NotificationPreference = {
  id: number;
  primary_email: NotificationCustomData;
  primary_phone: NotificationCustomData,
  additional_emails: [];
  additional_phones: [];
  is_primary: boolean;
  is_email_newsletter_ok: boolean;
};

export type UpdateNotificationPreferencesProps = (NotificationPreference | null)[] | null;
