export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public errorType = "INTERNAL_SERVER_ERROR",
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
