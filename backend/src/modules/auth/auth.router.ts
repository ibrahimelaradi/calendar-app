import { Router } from "express";
import {
  LoginParamsSchema,
  SignupParamsSchema,
  UserDtoSchema,
} from "@calendar-app/schemas/dtos/auth.dto";
import { castWithSchema, validateWithSchema } from "../common/utils";
import authService from "./auth.service";
import { cookieConfig } from "../../config/cookie";
import { ValidationError } from "../common/error";
import passport from "passport";
import { TokenExpiredError } from "jsonwebtoken";
import { protect } from "../../passport";

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

    res.status(201);
    res.end();
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json(e.toJson());
    }
    console.error(e);
    return res.status(500).json({ message: "Unknown error" });
  }
});

authRouter.post("/login", async (req, res) => {
  const problem = validateWithSchema(LoginParamsSchema, req.body);
  if (problem) {
    return res.status(400).json(problem.toJson());
  }

  try {
    const tokens = await authService.login(req.body);

    res.cookie("accessToken", tokens.accessToken, cookieConfig);
    res.cookie("refreshToken", tokens.refreshToken, cookieConfig);

    res.status(201);
    res.end();
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json(e.toJson());
    }
    console.error(e);
    return res.status(500).json({ message: "Unknown error" });
  }
});

authRouter.post("/refresh", async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
  }
  const { refreshToken } = req.cookies;

  try {
    const tokens = authService.refreshTokens(refreshToken);

    res.cookie("accessToken", tokens.accessToken, cookieConfig);
    res.cookie("refreshToken", tokens.refreshToken, cookieConfig);

    res.status(201);
    res.end();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    return res.status(500).json({ message: "Unknown error" });
  }
});

authRouter.post(
  "/logout",
  protect(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200);
    res.end();
  })
);

authRouter.get(
  "/profile",
  protect(async (req, res) => {
    const user = await authService.resolveUserById(req.user!.userId);
    if (!user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.sendStatus(401);
    }

    const dto = castWithSchema(UserDtoSchema, user);

    res.json(dto);
  })
);

export default authRouter;
