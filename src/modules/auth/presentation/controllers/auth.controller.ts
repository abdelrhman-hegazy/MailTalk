import { Request, Response } from "express";
import { LoginDto, RegisterDto, VerificationDto } from "../dtos/auth.dto";
import {
  AppError,
  catchAsync,
  extractToken,
  sendResponse,
} from "../../../../shared/utils";
import { config } from "../../../../config";
import { RegisterUsecase } from "../../application/use-cases/register.usecase";
import { VerificationUsecase } from "../../application/use-cases/verification.usecase";
import { LoginUsecase } from "../../application/use-cases/login.usecase";
import { RefreshTokenUsecase } from "../../application/use-cases/refresh-token.usecase";
import { OAuthLoginUsecase } from "../../application/use-cases/oauth-login.usecase";

export class AuthController {
  private readonly REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor(
    private registerUsecase: RegisterUsecase,
    private verificationUsecase: VerificationUsecase,
    private loginUsecase: LoginUsecase,
    private refreshTokenUsecase: RefreshTokenUsecase,
    private oauthLoginUsecase: {
      google: OAuthLoginUsecase;
      facebook: OAuthLoginUsecase;
    },
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
    const isMobile = this.isMobileClient(req);

    const result = await this.verificationUsecase.execute(email, code);

    sendResponse(res, {
      message: "User verified successfully",
      tokens: this.formatTokenResponse(
        result.accessToken,
        result.refreshToken,
        isMobile,
      ),
      cookies: this.createRefreshTokenCookie(result.refreshToken, isMobile),
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password }: LoginDto = req.body;
    const isMobile = this.isMobileClient(req);

    const result = await this.loginUsecase.execute(email, password);

    sendResponse(res, {
      message: "User logged in successfully",
      tokens: this.formatTokenResponse(
        result.accessToken,
        result.refreshToken,
        isMobile,
      ),
      cookies: this.createRefreshTokenCookie(result.refreshToken, isMobile),
    });
  });

  refreshToken = catchAsync(async (req: Request, res: Response) => {
    const isMobile = this.isMobileClient(req);

    const refreshToken = extractToken(req, isMobile, {
      cookieName: "refreshToken",
      bodyKey: "refreshToken",
    });

    if (!refreshToken) {
      throw new AppError("Refresh token is required", 401, "missing_token");
    }

    const result = await this.refreshTokenUsecase.execute(refreshToken);

    sendResponse(res, {
      message: "Access token refreshed",
      tokens: this.formatTokenResponse(
        result.accessToken,
        result.refreshToken,
        isMobile,
      ),
      cookies: this.createRefreshTokenCookie(result.refreshToken, isMobile),
    });
  });

  oauthLogin = catchAsync(async (req, res) => {
    const { provider, accessToken } = req.body;
    const isMobile = this.isMobileClient(req);

    const tokens = await this.oauthLoginUsecase[provider].execute(accessToken);

    sendResponse(res, {
      message: "User logged in successfully",
      tokens: this.formatTokenResponse(
        tokens.accessToken,
        tokens.refreshToken,
        isMobile,
      ),
      cookies: this.createRefreshTokenCookie(tokens.refreshToken, isMobile),
    });
  });

  // Helper methods
  private isMobileClient(req: Request): boolean {
    return req.headers.client === "not-browser";
  }

  private addBearerPrefix(token: string): string {
    return `Bearer ${token}`;
  }

  private formatTokenResponse(
    accessToken: string,
    refreshToken: string,
    isMobile: boolean,
  ) {
    return {
      accessToken: this.addBearerPrefix(accessToken),
      ...(isMobile && {
        refreshToken: this.addBearerPrefix(refreshToken),
      }),
    };
  }

  private createRefreshTokenCookie(refreshToken: string, isMobile: boolean) {
    if (isMobile) {
      return undefined;
    }

    return {
      name: "refreshToken",
      value: this.addBearerPrefix(refreshToken),
      options: {
        httpOnly: true,
        secure: config.environment.NODE_ENV === "production",
        sameSite: "strict" as const,
        maxAge: this.REFRESH_TOKEN_MAX_AGE,
      },
    };
  }
}
