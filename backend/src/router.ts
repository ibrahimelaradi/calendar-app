import { Express, Router } from "express";
import authRouter from "./modules/auth/auth.router";

export function registerRoutes(app: Express) {
	const router = Router();

	router.use("/auth", authRouter);

	app.use("/api", router);
}
