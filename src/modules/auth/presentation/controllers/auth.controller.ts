import { RegisterUsecase } from "../../application/use-cases/register.usecase";
import { Request, Response } from "express";
import { LoginDto, RegisterDto, VerificationDto } from "../dtos/auth.dto";
import { catchAsync } from "../../../../shared/utils/catchAsync";
import { VerificationUsecase } from "../../application/use-cases/verification.usecase";
import { config } from "../../../../config";
import { LoginUsecase } from "../../application/use-cases/login.usecase";
import { sendResponse } from "../../../../shared/utils/response";

export class AuthController {
  constructor(
    private registerUsecase: RegisterUsecase,
    private verificationUsecase: VerificationUsecase,
    private loginUsecase: LoginUsecase,
  ) {}

  register = catchAsync(async (req: Request, res: Response) => {
    const { email, name, password }: RegisterDto = req.body;

    await this.registerUsecase.execute(email, name, password);

    sendResponse(res, {
      statusCode: 201,
      message: "Verification email sent",
    });
  });

  verification = catchAsync(async (req: Request, res: Response) => {
    const { email, code }: VerificationDto = req.body;
    const client = req.headers.client;

    const result = await this.verificationUsecase.execute(email, code);

    const isMobile = client === "not-browser";

    sendResponse(res, {
      message: "User verified successfully",
      tokens: {
        accessToken: "Bearer " + result.accessToken,
        ...(isMobile && {
          refreshToken: "Bearer " + result.refreshToken,
        }),
      },
      cookies: !isMobile
        ? {
            name: "refreshToken",
            value: "Bearer " + result.refreshToken,
            options: {
              httpOnly: true,
              secure: config.environment.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            },
          }
        : undefined,
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password }: LoginDto = req.body;
    const client = req.headers.client;

    const result = await this.loginUsecase.execute(email, password);

    const isMobile = client === "not-browser";

    sendResponse(res, {
      message: "User logged in successfully",
      tokens: {
        accessToken: "Bearer " + result.accessToken,
        ...(isMobile && {
          refreshToken: "Bearer " + result.refreshToken,
        }),
      },
      cookies: !isMobile
        ? {
            name: "refreshToken",
            value: "Bearer " + result.refreshToken,
            options: {
              httpOnly: true,
              secure: config.environment.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            },
          }
        : undefined,
    });
  });
}
