import { Request } from "express";

export type TokenSource = "cookie" | "authorization" | "body";

export function extractToken(
  req: Request,
  isMobile: boolean,
  options: {
    cookieName?: string;
    bodyKey?: string;
    header?: boolean;
  },
): string | undefined {
  if (!isMobile && options.cookieName && req.cookies?.[options.cookieName]) {
    return req.cookies[options.cookieName].replace("Bearer ", "");
  }

  if (isMobile && options.bodyKey && req.body?.[options.bodyKey]) {
    return req.body[options.bodyKey].replace("Bearer ", "");
  }

  if (options.header && req.headers.authorization?.startsWith("Bearer ")) {
    return req.headers.authorization.split(" ")[1];
  }

  return undefined;
}
