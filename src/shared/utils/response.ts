import { Response } from "express";
import { cleanObject } from "./cleanObject";
import { ApiResponse } from "../types/api-response";

interface sendResponseParams<T> extends ApiResponse<T> {
  statusCode: number;
  cookies?: {
    name: string;
    value: string;
    options: object;
  };
}
export const sendResponse = (
  res: Response,
  {
    statusCode = 200,
    message,
    data = null,
    tokens = undefined,
    cookies = null,
  }: sendResponseParams<unknown>,
) => {
  if (cookies) {
    res.cookie(cookies.name, cookies.value, cookies.options);
  }
  const responseBody = cleanObject({
    success: true,
    message,
    data,
    tokens,
  });

  return res.status(statusCode).json(responseBody);
};
