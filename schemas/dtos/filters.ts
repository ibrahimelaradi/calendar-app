import { Type, Static } from "@sinclair/typebox";
import { StringDate } from "./common";

export const FiltersSchema = Type.Object({
	search: Type.Optional(Type.String()),
	fromDate: Type.Optional(StringDate),
	toDate: Type.Optional(StringDate),
	userId: Type.Optional(Type.String()),
	eventId: Type.Optional(Type.String()),
	page: Type.Optional(Type.Number()),
	pageSize: Type.Optional(Type.Number()),
	order: Type.Optional(Type.String()),
	orderBy: Type.Optional(Type.String()),
});

export type Filters = Static<typeof FiltersSchema>;
