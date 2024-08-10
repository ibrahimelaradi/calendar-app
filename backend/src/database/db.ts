import knex from "knex";

const db = knex({
	client: "pg",
	connection: {
		connectionString: process.env.DATABASE_URL,
		host: process.env["DB_HOST"],
		port: Number(process.env["DB_PORT"]) || undefined,
		user: process.env["DB_USER"],
		database: process.env["DB_NAME"],
		password: process.env["DB_PASSWORD"],
		ssl: process.env["DB_SSL"] ? { rejectUnauthorized: false } : false,
		timezone: "UTC",
		dateStrings: true,
	},
});

export default db;
