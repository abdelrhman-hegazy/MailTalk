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
    const exists = await this.userRepo.findUserByEmail(email);
    console.log("exists////////", exists);
    // Hash password
    const hashedPassword = await this.hashService.hash(password);
    // generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const hashedVerificationCode = await this.hashService.hash(
      verificationCode.toString(),
    );
    // expire after 3 minutes
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 3);
    console.log("verificationCode////////", verificationCode);
    console.log("expiryDate////////", expiryDate);
    // Check if user already exists
    if (!exists) {
      // Create user
      const user = new User(
        crypto.randomUUID(),
        email,
        name,
        hashedPassword,
        "EMAIL",
        null,
        false,
        new Date(),
        hashedVerificationCode,
        expiryDate,
      );
      await this.userRepo.createUser(user);
    } else {
      //update hashed verification code and expiry date
      exists.verificationCode = hashedVerificationCode;
      exists.verificationCodeExpiry = expiryDate;
      const updatedUser = await this.userRepo.updateUser(exists);
      console.log("updatedUser////////", updatedUser);
    }
    // send verification email
    await this.emailService.sendVerification(
      email,
      "Verification Code",
      verificationCode,
    );
    // Return user data
    return { message: "Verification email sent" };
  }
}
