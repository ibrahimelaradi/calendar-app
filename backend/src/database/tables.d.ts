import { Knex } from "knex";

declare module "knex/types/tables" {
	interface User {
		id: string;
		username: string;
		passwordHash: string;
		email: string;
		fullName: string | null;
		birthDate: Date | null;
		createdAt: Date;
		updatedAt: Date;
	}
	type UserInsert = Pick<User, "username" | "passwordHash" | "email"> &
		Partial<Pick<User, "birthDate" | "fullName">>;
	type UserUpdate = Partial<
		Pick<User, "username" | "passwordHash" | "email" | "fullName" | "birthDate">
	> &
		Pick<User, "updatedAt">;
	interface Tables {
		users: Knex.CompositeTableType<User, UserInsert, UserUpdate>;
	}
}

export {};
