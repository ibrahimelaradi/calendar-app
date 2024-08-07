import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
			host: process.env["DB_HOST"],
			port: Number(process.env["DB_PORT"]) || undefined,
			user: process.env["DB_USER"],
			database: process.env["DB_NAME"],
			password: process.env["DB_PASSWORD"],
			ssl: process.env["DB_SSL"] ? { rejectUnauthorized: false } : false,
			dateStrings: true,
			timezone: "UTC",
		},
	},

	staging: {
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
			host: process.env["DB_HOST"],
			port: Number(process.env["DB_PORT"]) || undefined,
			user: process.env["DB_USER"],
			database: process.env["DB_NAME"],
			password: process.env["DB_PASSWORD"],
			ssl: process.env["DB_SSL"] ? { rejectUnauthorized: false } : false,
			dateStrings: true,
			timezone: "UTC",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		client: "pg",
		connection: {
			connectionString: process.env.DATABASE_URL,
			host: process.env["DB_HOST"],
			port: Number(process.env["DB_PORT"]) || undefined,
			user: process.env["DB_USER"],
			database: process.env["DB_NAME"],
			password: process.env["DB_PASSWORD"],
			ssl: process.env["DB_SSL"] ? { rejectUnauthorized: false } : false,
			dateStrings: true,
			timezone: "UTC",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

module.exports = config;
