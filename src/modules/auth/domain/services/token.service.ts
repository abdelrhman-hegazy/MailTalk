export interface TokenPayload {
  userId: string;
}

export interface TokenService {
  generateAccessToken(userId: string): string;
  generateRefreshToken(userId: string): string;
  verifyAccessToken(token: string): TokenPayload;
  verifyRefreshToken(token: string): TokenPayload;
}
