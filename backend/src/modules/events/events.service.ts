import { Filters } from "@calendar-app/schemas/dtos/filters";
import {
	CreateEventParams,
	UpdateEventParams,
} from "@calendar-app/schemas/dtos/events.dto";
import eventsDal from "./events.dal";
import dayjs from "dayjs";
import { UserEvent } from "knex/types/tables";

const eventsService = {
	async getUserEvents(userId: string, filters: Filters) {
		filters.userId = userId;
		return await eventsDal.getEvents(filters);
	},
	async getUserEvent(userId: string, eventId: string) {
		const ev = await eventsDal.getEventById(eventId);
		return ev && ev.userId === userId ? ev : undefined;
	},
	async createUserEvent(userId: string, data: CreateEventParams) {
		const { allDay, ...rest } = data;
		if (data.allDay) {
			data.endDate = dayjs(data.startDate).endOf("day").toDate();
		} else if (!data.endDate) {
			data.endDate = dayjs(data.startDate).add(1, "hour").toDate();
		}
		return await eventsDal.createEvent({ userId, ...rest });
	},
	async updateUserEvent(
		userId: string,
		eventId: string,
		data: UpdateEventParams
	) {
		const { allDay, ...rest } = data;
		if (data.allDay) {
			data.endDate = dayjs(data.startDate).endOf("day").toDate();
		} else if (!data.endDate) {
			data.endDate = dayjs(data.startDate).add(1, "hour").toDate();
		}
		const results = await eventsDal.updateEvents(
			{ userId, eventId },
			{ ...rest, updatedAt: new Date() }
		);
		return results.at(0) as UserEvent | undefined;
	},
	async deleteUserEvent(userId: string, eventId: string) {
		const results = await eventsDal.deleteEvents({ userId, eventId });
		return results.at(0) as UserEvent | undefined;
	},
};

export default eventsService;
