import _jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt";

export type JwtPayload = Express.User;

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

const jwt = {
	createTokens(userId: string): Tokens {
		const accessToken = _jwt.sign({ userId }, jwtConfig.accessSecret, {
			expiresIn: jwtConfig.accessExpresIn,
		});
		const refreshToken = _jwt.sign({ userId }, jwtConfig.refreshSecret, {
			expiresIn: jwtConfig.refreshExpresIn,
		});
		return { accessToken, refreshToken };
	},
	verifyAccessToken(token: string): JwtPayload {
		return _jwt.verify(token, jwtConfig.accessSecret) as JwtPayload;
	},
	verifyRefreshToken(token: string): JwtPayload {
		return _jwt.verify(token, jwtConfig.refreshSecret) as JwtPayload;
	},
};

export default jwt;
