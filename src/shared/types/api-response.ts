export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
  tokens?: {
    accessToken: string;
    refreshToken?: string;
  };
}
