import { Type, Static } from "@sinclair/typebox";

export const FiltersSchema = Type.Object({
	search: Type.Optional(Type.String()),
	fromDate: Type.Optional(Type.String({ format: "date" })),
	toDate: Type.Optional(Type.String({ format: "date" })),
	userId: Type.Optional(Type.String()),
	eventId: Type.Optional(Type.String()),
});

export type Filters = Static<typeof FiltersSchema>;
