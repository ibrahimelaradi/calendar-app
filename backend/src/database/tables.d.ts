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
		description: Date | string | null;
		startDate: Date;
		endDate: string;
		isReoccurring: boolean;
		isPublic: boolean;
		createdAt: Date | string;
		updatedAt: Date | string;
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

	interface Invite {
		id: string;
		inviterId: string;
		eventId: string;
		inviteeId: string;
		status: "pending" | "accepted" | "rejected";
		createdAt: Date;
	}
	type InviteInsert = Pick<User, "inviterId" | "inviteeId" | "eventId"> &
		Partial<Pick<User, "status">>;
	type InviteUpdate = Partial<Pick<User, "status">>;

	interface EventInvite {
		id: string;
		inviterId: string;
		inviterFullName: string;
		inviteeId: string;
		status: "pending" | "accepted" | "rejected";
		eventTitle: string;
		eventStartDate: Date;
		eventEndDate: Date;
	}

	interface Tables {
		users: Knex.CompositeTableType<User, UserInsert, UserUpdate>;
		events: Knex.CompositeTableType<
			UserEvent,
			UserEventInsert,
			UserEventUpdate
		>;
		invites: Knex.CompositeTableType<Invite, InviteInsert, InviteUpdate>;
		event_invites: EventInvite;
	}
}

export {};
