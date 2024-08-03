import { CookieOptions } from "express";

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
  secure: process.env.NODE_ENV === "production",
};
