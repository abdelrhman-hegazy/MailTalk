export interface RegisterDto {
  email: string;
  name: string;
  password: string;
}
export interface VerificationDto {
  email: string;
  code: string;
}
