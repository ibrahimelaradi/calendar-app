import { UserInsert } from "knex/types/tables";
import db from "../../database/db";

const authDal = {
	async getUserById(id: string) {
		return await db.table("users").where({ id }).first();
	},
	async getUserByUsername(username: string) {
		return await db.table("users").where({ username }).first();
	},
	async isUsernameTaken(username: string) {
		const user = await this.getUserByUsername(username);
		return !!user;
	},
	async insertUser(user: UserInsert) {
		const [{ id }] = await db.table("users").insert(user).returning("id");
		return id;
	},
};

export default authDal;
