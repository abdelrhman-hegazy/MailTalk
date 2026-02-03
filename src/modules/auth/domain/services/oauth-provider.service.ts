export interface OAuthProfile {
  provider: AuthProvider;
  providerId: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export interface OAuthProvider {
  getProfile(accessToken: string): Promise<OAuthProfile>;
}

export enum AuthProvider {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
}
