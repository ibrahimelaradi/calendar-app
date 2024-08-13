import { InviteInsert, InviteUpdate } from "knex/types/tables";
import db from "../../database/db";
import { Filters } from "@calendar-app/schemas/dtos/filters";
import { invitesFiltersQueryBuilder } from "./invites.utils";

const invitesDal = {
	async getInviteById(id: string) {
		return await db.table("event_invites").where("id", id).first();
	},
	async getInvitesByUserId(userId: string, filters: Filters) {
		filters.inviterId = userId;
		return await db
			.table("event_invites")
			.where(invitesFiltersQueryBuilder(filters))
			.select("*");
	},
	async getInvitesForUserId(userId: string, filters: Filters) {
		filters.inviteeId = userId;
		return await db
			.table("event_invites")
			.where(invitesFiltersQueryBuilder(filters))
			.select("*");
	},
	async createInvite(invite: InviteInsert) {
		return await db.table("invites").insert(invite).returning("*");
	},
	async updateInvite(id: string, invite: InviteUpdate) {
		return await db
			.table("invites")
			.where("id", id)
			.update(invite)
			.returning("*");
	},
	async deleteInvite(id: string) {
		return await db.table("invites").where("id", id).del().returning("*");
	},
};

export default invitesDal;
