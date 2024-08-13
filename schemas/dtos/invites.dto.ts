import { Static, Type } from "@sinclair/typebox";

export const CreateInviteDtoSchema = Type.Object({
	userId: Type.String(),
});
export type CreateInviteDto = Static<typeof CreateInviteDtoSchema>;
