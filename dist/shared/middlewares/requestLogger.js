"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("../utils/logger");
const requestLogger = (req, _res, next) => {
    logger_1.logger.info({
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
    }, "Incoming request");
    next();
};
exports.requestLogger = requestLogger;
