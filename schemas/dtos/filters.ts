import { Type, Static } from "@sinclair/typebox";

export const FiltersSchema = Type.Object({
	search: Type.Optional(Type.String()),
	fromDate: Type.Optional(Type.Date()),
	toDate: Type.Optional(Type.Date()),
	userId: Type.Optional(Type.String()),
	eventId: Type.Optional(Type.String()),
});

export type Filters = Static<typeof FiltersSchema>;
