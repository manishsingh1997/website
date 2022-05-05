import {ParsedAPIErrorType} from '../../utils/types';

type ContactType = {
  formatted_identifier: string;
  id: number;
  identifier: string;
  label: string | null;
  type: string;
};

export type AppNotificationsState = {
  error: ParsedAPIErrorType | null;
  initialError: ParsedAPIErrorType | null;
  isInitialLoading: boolean;
  isSavedSuccessfully: boolean;
  isSaving: boolean;
  primaryContact: NotificationPreference | null;
  unsubscribeAutomatically: boolean;
};

export type NotificationPreference = {
  additional_emails: ContactType[];
  additional_phones: ContactType[];
  id: number;
  is_email_newsletter_ok: boolean;
  is_primary: boolean;
  primary_email: ContactType;
  primary_phone: ContactType,
};

export type UpdateNotificationPreferences = (NotificationPreference | null)[] | null;
