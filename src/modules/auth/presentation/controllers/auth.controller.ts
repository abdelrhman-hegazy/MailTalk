import { RegisterUsecase } from "../../application/use-cases/register.usecase";
import { Request, Response } from "express";
import { RegisterDto, VerificationDto } from "../dtos/auth.dto";
import { catchAsync } from "../../../../shared/utils/catchAsync";
import { VerificationUsecase } from "../../application/use-cases/verification.usecase";
import { config } from "../../../../config";

export class AuthController {
  constructor(
    private registerUsecase: RegisterUsecase,
    private verificationUsecase: VerificationUsecase,
  ) {}

  register = catchAsync(async (req: Request, res: Response) => {
    const { email, name, password }: RegisterDto = req.body;
    const result = await this.registerUsecase.execute(email, name, password);
    res.status(201).json({
      status: "success",
      message: result,
    });
  });

  verification = catchAsync(async (req: Request, res: Response) => {
    const { email, code }: VerificationDto = req.body;
    const { client } = req.headers;
    const result = await this.verificationUsecase.execute(email, code);
    if (client === "not-browser") {
      res.status(200).json({
        status: "success",
        message: "User verified successfully",
        tokens: {
          accessToken: "Bearer " + result.accessToken,
          refreshToken: "Bearer " + result.refreshToken,
        },
      });
    } else {
      res
        .cookie("refreshToken", "Bearer " + result.refreshToken, {
          httpOnly: true,
          secure: config.environment.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({
          status: "success",
          message: "User verified successfully",
          tokens: {
            accessToken: "Bearer " + result.accessToken,
          },
        });
    }
  });
}
