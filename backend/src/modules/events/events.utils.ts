import { Filters } from "@calendar-app/schemas/dtos/filters";
import { Knex } from "knex";
import { Tables } from "knex/types/tables";

export function eventsFiltersQueryBuilder(filters: Filters) {
	return (builder: Knex.QueryBuilder<Tables["events"], Tables["events"][]>) => {
		let query = builder;
		if (filters.eventId) {
			query = query.where("id", filters.eventId);
		}
		if (filters.userId) {
			query = query.where("userId", filters.userId);
		}
		if (filters.search) {
			query = query.where("title", "like", `%${filters.search}%`);
		}
		if (filters.fromDate) {
			query = query.where("date", ">=", filters.fromDate);
		}
		if (filters.toDate) {
			query = query.where("date", "<", filters.toDate);
		}
		return query;
	};
}
