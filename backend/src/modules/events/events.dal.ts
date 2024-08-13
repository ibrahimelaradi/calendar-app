import { Filters } from "@calendar-app/schemas/dtos/filters";
import { UserEventInsert, UserEventUpdate } from "knex/types/tables";
import db from "../../database/db";
import { eventsFiltersQueryBuilder } from "./events.utils";

const eventsDal = {
	async createEvent(data: UserEventInsert) {
		const [res] = await db.table("events").insert(data, "*");
		return res;
	},
	async countEvents(filters: Filters) {
		const res = await db
			.table("events")
			.where(eventsFiltersQueryBuilder(filters))
			.count<{ count: number }>({ count: "*" })
			.first();
		return res?.count || 0;
	},
	async getEvents(filters: Filters) {
		let query = db.table("events").where(eventsFiltersQueryBuilder(filters));
		if (filters.page !== undefined && filters.pageSize !== undefined) {
			query = query
				.limit(filters.pageSize)
				.offset((filters.page - 1) * filters.pageSize)
				.orderBy(filters.orderBy || "createdAt", filters.order || "desc");
		}
		return await query.select("*");
	},
	async getEventById(id: string) {
		return await db.table("events").where("id", id).first();
	},
	async updateEvents(filters: Filters, event: UserEventUpdate) {
		return await db
			.table("events")
			.where(eventsFiltersQueryBuilder(filters))
			.update(event, "*");
	},
	async deleteEvents(filters: Filters) {
		return await db
			.table("events")
			.where(eventsFiltersQueryBuilder(filters))
			.delete("*");
	},
};

export default eventsDal;
