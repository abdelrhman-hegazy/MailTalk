"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./shared/middlewares/error.middleware");
const requestLogger_1 = require("./shared/middlewares/requestLogger");
const AppError_1 = require("./shared/errors/AppError");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(requestLogger_1.requestLogger);
app.use("/api/v1/health", (_req, res, next) => {
    if (true) {
        next(new AppError_1.AppError("fazloka", 400, "FAZLOKA"));
    }
    res.status(200).send("Chatbox is running");
});
// Error handling middleware should be the last middleware
app.use(error_middleware_1.errorHandler);
exports.default = app;
