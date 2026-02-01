export interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
  tokens?: {
    accessToken: string;
    refreshToken?: string;
  };
}
