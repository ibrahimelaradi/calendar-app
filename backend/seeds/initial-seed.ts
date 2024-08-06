import { Knex } from "knex";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("users").del();
	await knex("events").del();

	// Inserts seed entries
	const [{ id: userId }] = await knex.table("users").insert(
		[
			{
				username: "ibrahimelaradi",
				passwordHash: await bcrypt.hash("User123!", 10),
				email: "ibrahimelaradi@gmail.com",
				fullName: "Ibrahim Elaradi",
				birthDate: new Date("1998-11-14"),
			},
		],
		"*"
	);

	await knex.table("events").insert([
		{
			userId,
			title: "My first event",
			description: "This is my first event",
			startDate: dayjs().add(5, "day").startOf("day").toDate(),
			endDate: dayjs().add(5, "day").endOf("day").toDate(),
			isReoccurring: false,
			isPublic: false,
		},
		{
			userId,
			title: "My second event",
			description: "This is my second event",
			startDate: dayjs().add(2, "day").startOf("day").toDate(),
			endDate: dayjs().add(5, "day").endOf("day").toDate(),
			isReoccurring: false,
			isPublic: true,
		},
		{
			userId,
			title: "My third event",
			description: "This is my third event",
			startDate: dayjs().add(8, "day").startOf("day").toDate(),
			endDate: dayjs().add(9, "day").endOf("day").toDate(),
			isReoccurring: false,
			isPublic: true,
		},
		{
			userId,
			title: "My fourth event",
			description: "This is my fourth event",
			startDate: dayjs().add(1, "day").startOf("day").toDate(),
			endDate: dayjs().add(1, "day").endOf("day").toDate(),
			isReoccurring: true,
			isPublic: false,
		},
	]);
}
