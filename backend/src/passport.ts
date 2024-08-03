import {
  Express,
  Request,
  Response,
  RequestHandler,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import * as core from "express-serve-static-core";
import passport from "passport";
import { Strategy as CustomStrategy } from "passport-custom";
import jwt from "./modules/common/jwt";
import { TokenExpiredError } from "jsonwebtoken";

function fromCookie(req: Request) {
  return req.cookies?.accessToken;
}

export function protect<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
>(cb: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>) {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ) => {
    passport.authenticate(
      "cookie",
      { session: false },
      (err: unknown, user?: Express.User | null) => {
        if (err) {
          if (err instanceof TokenExpiredError) {
            res.setHeader("X-Token-Expired", "true");
            return res
              .status(401)
              .json({ message: "Token expired" } as ResBody);
          }
          return res.status(401).json({ message: "Unauthorized" } as ResBody);
        }
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" } as ResBody);
        }
        req.user = user;
        cb(req, res, next);
      }
    )(req, res, next);
  };
}

export function registerPassport(app: Express) {
  app.use(passport.initialize());
  passport.use(
    "cookie",
    new CustomStrategy((req, done) => {
      const token = fromCookie(req);
      if (!token) {
        return done(null, false);
      }
      try {
        const user = jwt.verifyAccessToken(token);
        done(null, user);
      } catch (e) {
        return done(e, false);
      }
    })
  );
}
