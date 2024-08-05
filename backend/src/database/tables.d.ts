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

	interface UserEvent {
		id: string;
		userId: string;
		title: string;
		description: string | null;
		startDate: Date;
		endDate: Date;
		isReoccurring: boolean;
		isPublic: boolean;
		createdAt: Date;
		updatedAt: Date;
	}
	type UserEventInsert = Pick<UserEvent, "userId", "title" | "start" | "end"> &
		Partial<Pick<UserEvent, "description" | "isReoccurring" | "isPublic">>;
	type UserEventUpdate = Partial<
		Pick<
			UserEvent,
			"title" | "description" | "start" | "end" | "isReoccurring" | "isPublic"
		>
	> &
		Pick<UserEvent, "updatedAt">;
	interface Tables {
		users: Knex.CompositeTableType<User, UserInsert, UserUpdate>;
		events: Knex.CompositeTableType<
			UserEvent,
			UserEventInsert,
			UserEventUpdate
		>;
	}
}

export {};
