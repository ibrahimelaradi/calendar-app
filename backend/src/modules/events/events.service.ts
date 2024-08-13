import { Filters } from "@calendar-app/schemas/dtos/filters";
import {
	CreateEventParams,
	UpdateEventParams,
} from "@calendar-app/schemas/dtos/events.dto";
import eventsDal from "./events.dal";
import dayjs from "dayjs";
import { UserEvent } from "knex/types/tables";
import invitesDal from "../invites/invites.dal";
import { ValidationError } from "../common/error";
import usersDal from "../users/users.dal";

const eventsService = {
	async countUserEvents(userId: string, filters: Filters) {
		filters.userId = userId;
		return await eventsDal.countEvents(filters);
	},
	async getUserEvents(userId: string, filters: Filters) {
		filters.userId = userId;
		return await eventsDal.getEvents(filters);
	},
	async getUserEvent(userId: string, eventId: string) {
		const ev = await eventsDal.getEventById(eventId);
		return ev && ev.userId === userId ? ev : undefined;
	},
	async createUserEvent(userId: string, data: CreateEventParams) {
		return await eventsDal.createEvent({ userId, ...data });
	},
	async updateUserEvent(
		userId: string,
		eventId: string,
		data: UpdateEventParams
	) {
		const results = await eventsDal.updateEvents(
			{ userId, eventId },
			{ ...data, updatedAt: dayjs().toDate() }
		);
		return results.at(0) as UserEvent | undefined;
	},
	async deleteUserEvent(userId: string, eventId: string) {
		const results = await eventsDal.deleteEvents({ userId, eventId });
		return results.at(0) as UserEvent | undefined;
	},
	async createEventInvite(
		userId: string,
		eventId: string,
		inviteeUsername: string
	) {
		const event = this.getUserEvent(userId, eventId);
		if (!event) {
			throw new ValidationError("Event does not exist");
		}
		const user = await usersDal.getUserByUsername(inviteeUsername);
		if (!user) {
			throw new ValidationError("User does not exist").addError(
				"username",
				"User not found"
			);
		}
		return await invitesDal.createInvite({
			inviterId: userId,
			eventId,
			inviteeId: user.id,
		});
	},
};

export default eventsService;
