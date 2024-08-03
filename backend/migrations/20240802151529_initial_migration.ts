import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("users", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());

		table.string("username").unique().notNullable();
		table.string("passwordHash").notNullable();

		table.string("email").unique().notNullable();

		table.string("fullName").nullable();
		table.date("birthDate").nullable();

		table.datetime("createdAt").defaultTo(knex.fn.now());
		table.datetime("updatedAt").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("users");
}
