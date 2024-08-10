import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("events", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());
		table
			.uuid("userId")
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");

		table.string("title").notNullable();
		table.string("description").nullable().defaultTo(null);

		table.datetime("startDate").notNullable();
		table.datetime("endDate").notNullable();
		table.boolean("isReoccurring").defaultTo(false);

		table.boolean("isPublic").defaultTo(false);

		table.datetime("createdAt").defaultTo(knex.fn.now());
		table.datetime("updatedAt").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("events");
}
