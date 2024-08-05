export interface Profile {
  display_name: string | null;
  has_premium: boolean;
  id: string;
  is_admin: boolean;
  notifications_by_email_rating: boolean;
  notifications_by_email_verification: boolean;
  notifications_on_app_rating: boolean;
  notifications_on_app_verification: boolean;
}
