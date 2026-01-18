"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
async function main() {
    app_1.default.listen(3000);
}
main()
    .then(() => {
    console.log("Server started successfully");
})
    .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
