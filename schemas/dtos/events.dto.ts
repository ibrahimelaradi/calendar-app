import { Static, Type } from "@sinclair/typebox";

export const CreateEventParamsSchema = Type.Object({
	title: Type.String(),
	description: Type.Optional(Type.String()),
	startDate: Type.Date(),
	endDate: Type.Optional(Type.Date()),
	allDay: Type.Boolean(),
	isReoccurring: Type.Boolean(),
	isPublic: Type.Optional(Type.Boolean()),
});
export type CreateEventParams = Static<typeof CreateEventParamsSchema>;

export const UpdateEventParamsSchema = Type.Object({
	title: Type.String(),
	description: Type.Optional(Type.String()),
	startDate: Type.Date(),
	endDate: Type.Optional(Type.Date()),
	allDay: Type.Boolean(),
	isReoccurring: Type.Boolean(),
	isPublic: Type.Optional(Type.Boolean()),
});
export type UpdateEventParams = Static<typeof UpdateEventParamsSchema>;

export const EventDtoSchema = Type.Object({
	id: Type.String(),
	userId: Type.String(),

	title: Type.String(),
	description: Type.Optional(Type.String()),

	startDate: Type.Date(),
	endDate: Type.Date(),
	isReoccurring: Type.Boolean(),

	isPublic: Type.Boolean(),

	createdAt: Type.Date(),
	updatedAt: Type.Date(),
});
export type EventDto = Static<typeof EventDtoSchema>;
