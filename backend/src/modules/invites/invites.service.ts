import { Filters } from "@calendar-app/schemas/dtos/filters";
import { ValidationError } from "../common/error";
import invitesDal from "./invites.dal";

const invitesService = {
	async getUserInvites(userId: string, filters: Filters) {
		return await invitesDal.getInvitesForUserId(userId, filters);
	},
	async acceptInvite(userId: string, inviteId: string) {
		const invite = await invitesDal.getInviteById(inviteId);
		if (!invite || invite.inviteeId !== userId) {
			throw new ValidationError("Invalid invite");
		}
		return await invitesDal.updateInvite(inviteId, { status: "accepted" });
	},
	async rejectInvite(userId: string, inviteId: string) {
		const invite = await invitesDal.getInviteById(inviteId);
		if (!invite || invite.inviteeId !== userId) {
			throw new ValidationError("Invalid invite");
		}
		return await invitesDal.updateInvite(inviteId, { status: "rejected" });
	},
};

export default invitesService;
