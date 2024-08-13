import db from "../../database/db";

const usersDal = {
	async getUserByUsername(username: string) {
		return await db.table("users").where("username", username).first();
	},
};

export default usersDal;
