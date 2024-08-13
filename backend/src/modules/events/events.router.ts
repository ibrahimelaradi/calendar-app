import { Router } from "express";
import {
	castWithSchema,
	decodeWithSchema,
	encodeWithSchema,
	validateWithSchema,
} from "../common/utils";
import { FiltersSchema } from "@calendar-app/schemas/dtos/filters";
import { CreateInviteDtoSchema } from "@calendar-app/schemas/dtos/invites.dto";
import eventsService from "./events.service";
import { protect } from "../../passport";
import {
	CreateEventParamsSchema,
	EventDtoSchema,
	UpdateEventParamsSchema,
} from "@calendar-app/schemas/dtos/events.dto";
import { ValidationError } from "../common/error";

const eventsRouter = Router();

eventsRouter.get(
	"/",
	protect(async (req, res) => {
		const filters = decodeWithSchema(FiltersSchema, req.query);
		const events = await eventsService.getUserEvents(req.user!.userId, filters);
		res
			.status(200)
			.json(events.map(encodeWithSchema.bind(undefined, EventDtoSchema)));
	})
);

eventsRouter.get(
	"/calendar",
	protect(async (req, res) => {
		const filters = decodeWithSchema(FiltersSchema, req.query);
		if (!filters.fromDate || !filters.toDate) {
			const err = new ValidationError("Invalid resource filters")
				.addError("fromDate", "This parameter is required")
				.addError("toDate", "This parameter is required");
			return res.status(400).json(err.toJson());
		}
		const events = await eventsService.getUserEvents(req.user!.userId, filters);
		res
			.status(200)
			.json(events.map(encodeWithSchema.bind(undefined, EventDtoSchema)));
	})
);

eventsRouter.get(
	"/search",
	protect(async (req, res) => {
		const filters = decodeWithSchema(FiltersSchema, req.query);
		if (!filters.page || !filters.pageSize) {
			const err = new ValidationError("Invalid resource filters")
				.addError("page", "This parameter is required")
				.addError("pageSize", "This parameter is required");
			return res.status(400).json(err.toJson());
		}
		const events = await eventsService.getUserEvents(req.user!.userId, filters);
		const count = await eventsService.countUserEvents(
			req.user!.userId,
			filters
		);
		res.status(200).json({
			items: events.map(encodeWithSchema.bind(undefined, EventDtoSchema)),
			count,
		});
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
		res.status(200).json(encodeWithSchema(EventDtoSchema, event));
	})
);

eventsRouter.post(
	"/",
	protect(async (req, res) => {
		const errors = validateWithSchema(CreateEventParamsSchema, req.body);
		if (errors) {
			return res.status(400).json(errors.toJson());
		}
		const data = decodeWithSchema(CreateEventParamsSchema, req.body);
		const event = await eventsService.createUserEvent(req.user!.userId, data);
		res.status(201).json(encodeWithSchema(EventDtoSchema, event));
	})
);

eventsRouter.put(
	"/:eventId",
	protect(async (req, res) => {
		const errors = validateWithSchema(UpdateEventParamsSchema, req.body);
		if (errors) {
			return res.status(400).json(errors.toJson());
		}
		const data = decodeWithSchema(CreateEventParamsSchema, req.body);
		const event = await eventsService.updateUserEvent(
			req.user!.userId,
			req.params.eventId,
			data
		);
		if (!event) {
			return res.status(404).end();
		}
		res.status(200).json(encodeWithSchema(EventDtoSchema, event));
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
		res.status(200).json(encodeWithSchema(EventDtoSchema, event));
	})
);

eventsRouter.post(
	"/:eventId/invite",
	protect(async (req, res) => {
		const errors = validateWithSchema(CreateInviteDtoSchema, req.body);
		if (errors) {
			return res.status(400).json(errors.toJson());
		}
		const values = castWithSchema(CreateInviteDtoSchema, req.body);
		try {
			await eventsService.createEventInvite(
				req.user!.userId,
				req.params.eventId,
				values.userId
			);
			res.status(201).end();
		} catch (e) {
			if (e instanceof ValidationError) {
				return res.status(400).json(e.toJson());
			}
			return res.status(500).json({ message: "Internal server error" });
		}
	})
);

export default eventsRouter;
