import { Router } from "express";
import { protect } from "../../passport";
import invitesService from "./invites.service";
import { ValidationError } from "../common/error";

const invitesRouter = Router();

invitesRouter.get(
	"/",
	protect(async (req, res) => {
		const invites = await invitesService.getUserInvites(
			req.user!.userId,
			req.query
		);
		return res.status(200).json(invites);
	})
);

invitesRouter.post(
	"/:inviteId/accept",
	protect(async (req, res) => {
		try {
			await invitesService.acceptInvite(req.user!.userId, req.params.inviteId);
			return res.status(200).json({ message: "Invite accepted" });
		} catch (e) {
			if (e instanceof ValidationError) {
				return res.status(400).json(e.toJson());
			}
			return res.status(500).json({ message: "Internal server error" });
		}
	})
);

invitesRouter.post(
	"/:inviteId/reject",
	protect(async (req, res) => {
		try {
			await invitesService.rejectInvite(req.user!.userId, req.params.inviteId);
			return res.status(200).json({ message: "Invite rejected" });
		} catch (e) {
			if (e instanceof ValidationError) {
				return res.status(400).json(e.toJson());
			}
			return res.status(500).json({ message: "Internal server error" });
		}
	})
);

export default invitesRouter;
