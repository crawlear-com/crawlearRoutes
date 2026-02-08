import type { Session } from '@supabase/supabase-js'

export const sessionData: Session = {
  provider_token: "providerToken",
  provider_refresh_token: "providerRefreshToken",
  access_token: "accessToken",
  refresh_token: "refreshToken",
  expires_in: 121212,
  expires_at: 12121213123,
  token_type: "bearer",
  user: {
  id: "userId",
  app_metadata: {},
  user_metadata: {},
  aud: "",
  created_at: "213123123"
  }
};