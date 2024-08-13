import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("invites", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());

		table
			.uuid("eventId")
			.notNullable()
			.references("id")
			.inTable("events")
			.onDelete("CASCADE");
		table
			.uuid("userId")
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");

		table
			.enum("status", ["pending", "accepted", "rejected"])
			.defaultTo("pending");

		table.timestamp("createdAt").defaultTo(knex.fn.now());

		table.unique(["eventId", "userId"], { indexName: "idx_event_user" });
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("invites");
}
