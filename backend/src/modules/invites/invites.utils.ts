import { Filters } from "@calendar-app/schemas/dtos/filters";
import { Knex } from "knex";
import { Tables } from "knex/types/tables";

export function invitesFiltersQueryBuilder(filters: Filters) {
	return (
		builder: Knex.QueryBuilder<
			Tables["event_invites"],
			Tables["event_invites"][]
		>
	) => {
		let query = builder;
		if (filters.eventId) {
			query = query.where("id", filters.eventId);
		}
		if (filters.inviterId) {
			query = query.where("inviterId", filters.inviterId);
		}
		if (filters.inviteeId) {
			query = query.where("inviteeId", filters.inviteeId);
		}
		if (filters.inviteStatus) {
			query = query.where("status", filters.inviteStatus);
		}
		return query;
	};
}
