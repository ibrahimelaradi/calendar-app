import { Router } from "express";
import { SignupParamsSchema, UserDtoSchema } from "./auth.dto";
import { castWithSchema, validateWithSchema } from "../common/utils";
import authService from "./auth.service";
import { cookieConfig } from "../../config/cookie";
import { ValidationError } from "../common/error";
import passport from "passport";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
	const problem = validateWithSchema(SignupParamsSchema, req.body);
	if (problem) {
		return res.status(400).json(problem.toJson());
	}

	try {
		const tokens = await authService.signup(req.body);

		res.cookie("accessToken", tokens.accessToken, cookieConfig);
		res.cookie("refreshToken", tokens.refreshToken, cookieConfig);

		res.sendStatus(201);
	} catch (e) {
		if (e instanceof ValidationError) {
			return res.status(400).json(e.toJson());
		}
		console.error(e);
		return res.status(500).json({ message: "Unknown error" });
	}
});

authRouter.get(
	"/profile",
	passport.authenticate("cookie", { session: false }),
	async (req, res) => {
		const user = authService.resolveUserById(req.user!.userId);

		if (!user) {
			res.clearCookie("accessToken");
			res.clearCookie("refreshToken");
			return res.sendStatus(401);
		}

		const dto = castWithSchema(UserDtoSchema, user);

		res.json(dto);
	}
);

export default authRouter;
