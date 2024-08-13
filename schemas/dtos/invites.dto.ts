import { Static, Type } from "@sinclair/typebox";
import { StringDate } from "./common";

export const CreateInviteDtoSchema = Type.Object({
	username: Type.String(),
});
export type CreateInviteDto = Static<typeof CreateInviteDtoSchema>;

export const InviteDtoSchema = Type.Object({
	id: Type.String(),
	inviterId: Type.String(),
	inviterFullName: Type.Optional(Type.String()),
	eventId: Type.String(),
	inviteeId: Type.String(),
	eventTitle: Type.String(),
	eventStartDate: StringDate,
	eventEndDate: StringDate,
	status: Type.String(),
});
export type InviteDto = Static<typeof InviteDtoSchema>;
