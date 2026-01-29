import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { EmailService } from "../../domain/services/email.service";
import { HashService } from "../../domain/services/hash.service";

import crypto from "crypto";

export class RegisterUsecase {
  constructor(
    private userRepo: UserRepository,
    private hashService: HashService,
    private emailService: EmailService,
  ) {}

  async execute(email: string, name: string, password: string) {
    // Hash password
    const hashedPassword = await this.hashService.hash(password);
    // Check if user already exists
    const exists = await this.userRepo.findUserByEmail(email);
    if (!exists) {
      // Create user
      const user = new User(
        crypto.randomUUID(),
        email,
        name,
        hashedPassword,
        "EMAIL", // provider
        null, // providerId (null for email registration)
        false, // isVerified
        new Date(), // createdAt
      );
      await this.userRepo.createUser(user);
    }

    // Send verification     email
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await this.emailService.sendVerification(
      email,
      "Verification Code",
      verificationCode,
    );
    // Return user data
    return { message: "Verification email sent" };
  }
}
