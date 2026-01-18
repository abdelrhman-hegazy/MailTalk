"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500, errorType = "INTERNAL_SERVER_ERROR") {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
