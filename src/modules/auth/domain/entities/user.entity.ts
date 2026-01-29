export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public password: string | null,
    public provider: "EMAIL" | "GOOGLE" | "FACEBOOK" | "IPHONE",
    public providerId: string | null,
    public isVerified: boolean,
    public createdAt: Date,
  ) {}

  verifyEmail() {
    this.isVerified = true;
  }
}
