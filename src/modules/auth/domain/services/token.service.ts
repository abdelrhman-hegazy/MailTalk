export interface TokenService {
  generateAccessToken(userId: string): string;
  generateRefreshToken(userId: string): string;
  verifyAccessToken(token: string): string;
  verifyRefreshToken(token: string): string;
}
