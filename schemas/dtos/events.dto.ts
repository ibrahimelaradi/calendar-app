import { Static, TSchema, Type } from "@sinclair/typebox";
import dayjs from "dayjs";

const StringDate = Type.Transform(Type.Union([Type.Date(), Type.String()]))
	.Decode((date) => dayjs(date).toDate())
	.Encode((date) => dayjs(date).format());

export const CreateEventParamsSchema = Type.Object({
	title: Type.String(),
	description: Type.Optional(Type.String()),
	startDate: StringDate,
	endDate: StringDate,
	isReoccurring: Type.Boolean(),
	isPublic: Type.Optional(Type.Boolean()),
});
export type CreateEventParams = Static<typeof CreateEventParamsSchema>;

export const UpdateEventParamsSchema = Type.Object({
	title: Type.String(),
	description: Type.Optional(Type.String()),
	startDate: StringDate,
	endDate: StringDate,
	isReoccurring: Type.Boolean(),
	isPublic: Type.Optional(Type.Boolean()),
});
export type UpdateEventParams = Static<typeof UpdateEventParamsSchema>;

export const EventDtoSchema = Type.Object({
	id: Type.String(),
	userId: Type.String(),

	title: Type.String(),
	description: Type.Optional(Type.String()),

	startDate: StringDate,
	endDate: StringDate,
	isReoccurring: Type.Boolean(),

	isPublic: Type.Boolean(),

	createdAt: StringDate,
	updatedAt: StringDate,
});
export type EventDto = Static<typeof EventDtoSchema>;
