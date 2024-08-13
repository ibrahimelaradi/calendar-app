import { Express, Router } from "express";
import authRouter from "./modules/auth/auth.router";
import eventsRouter from "./modules/events/events.router";
import invitesRouter from "./modules/invites/invites.router";

export function registerRoutes(app: Express) {
	const router = Router();

	router.use("/auth", authRouter);
	router.use("/events", eventsRouter);
	router.use("/invites", invitesRouter);

	app.use("/api", router);
}
