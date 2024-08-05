import { Router } from "express";
import { castWithSchema } from "../common/utils";
import { FiltersSchema } from "@calendar-app/schemas/dtos/filters";
import eventsService from "./events.service";
import { protect } from "../../passport";
import { CreateEventParamsSchema } from "@calendar-app/schemas/dtos/events.dto";

const eventsRouter = Router();

eventsRouter.get(
	"/",
	protect(async (req, res) => {
		const filters = castWithSchema(FiltersSchema, req.query);
		const events = await eventsService.getUserEvents(req.user!.userId, filters);
		res.status(200).json(events);
	})
);

eventsRouter.get(
	"/:eventId",
	protect(async (req, res) => {
		const event = await eventsService.getUserEvent(
			req.user!.userId,
			req.params.eventId
		);
		if (!event) {
			return res.status(404).end();
		}
		res.status(200).json(event);
	})
);

eventsRouter.post(
	"/",
	protect(async (req, res) => {
		const data = castWithSchema(CreateEventParamsSchema, req.body);
		const event = await eventsService.createUserEvent(req.user!.userId, data);
		res.status(201).json(event);
	})
);

eventsRouter.put(
	"/:eventId",
	protect(async (req, res) => {
		const data = castWithSchema(CreateEventParamsSchema, req.body);
		const event = await eventsService.updateUserEvent(
			req.user!.userId,
			req.params.eventId,
			data
		);
		if (!event) {
			return res.status(404).end();
		}
		res.status(200).json(event);
	})
);

eventsRouter.delete(
	"/:eventId",
	protect(async (req, res) => {
		const event = await eventsService.deleteUserEvent(
			req.user!.userId,
			req.params.eventId
		);
		if (!event) {
			return res.status(404).end();
		}
		res.status(200).json(event);
	})
);

export default eventsRouter;
