"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../errors/AppError");
const config_1 = require("../../config");
const logger_1 = require("../utils/logger");
const errorHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let errorType = "INTERNAL_SERVER_ERROR";
    if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorType = err.errorType;
    }
    logger_1.logger.error({
        err,
        statusCode,
    }, err.message);
    if (config_1.config.enviroment.NODE_ENV === "development") {
        return res.status(statusCode).json({
            success: false,
            message,
            errorType,
            stack: err instanceof Error ? err.stack : undefined,
        });
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorType,
    });
};
exports.errorHandler = errorHandler;
