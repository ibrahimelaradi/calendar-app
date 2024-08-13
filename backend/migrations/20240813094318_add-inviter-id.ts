import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	knex.schema.alterTable("invites", (table) => {
		table.renameColumn("userId", "inviteeId");

		table
			.uuid("inviterId")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
	});
}

export async function down(knex: Knex): Promise<void> {
	knex.schema.alterTable("invites", (table) => {
		table.renameColumn("inviteeId", "userId");

		table.dropColumn("inviterId");
	});
}
