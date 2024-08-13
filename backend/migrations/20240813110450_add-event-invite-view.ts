import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createView("event_invites", (view) => {
		view.columns([
			"id",
			"inviterId",
			"status",
			"inviterFullName",
			"inviteeId",
			"eventTitle",
			"eventStartDate",
			"eventEndDate",
		]);
		view.as(
			knex
				.select(
					"invites.id as id",
					"inviterId",
					"status",
					"users.fullName as inviterFullName",
					"inviteeId",
					"events.title as eventTitle",
					"events.startDate as eventStartDate",
					"events.endDate as eventEndDate"
				)
				.from("invites")
				.join("users", "invites.inviterId", "users.id")
				.join("events", "invites.eventId", "events.id")
		);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropView("event_invites");
}
