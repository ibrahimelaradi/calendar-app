import { CookieOptions } from "express";

export const cookieConfig: CookieOptions = {
	httpOnly: true,
	sameSite: "strict",
	secure: process.env.NODE_ENV === "production",
};
