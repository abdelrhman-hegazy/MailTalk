export interface EmailService {
  sendVerification(
    to: string,
    subject: string,
    verificationCode: number,
  ): Promise<boolean>;
}
