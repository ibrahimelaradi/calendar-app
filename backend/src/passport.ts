import { Express, Request } from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { jwtConfig } from "./config/jwt";

function fromCookie(req: Request) {
	return req.cookies?.accessToken;
}

export function registerPassport(app: Express) {
	app.use(passport.initialize());
	passport.use(
		"cookie",
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromExtractors([
					fromCookie,
					ExtractJwt.fromAuthHeaderAsBearerToken(),
				]),
				secretOrKey: jwtConfig.accessSecret,
			},
			(payload, done) => {
				done(null, payload);
			}
		)
	);
}
