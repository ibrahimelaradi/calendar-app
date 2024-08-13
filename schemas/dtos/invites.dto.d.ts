import { Static } from "@sinclair/typebox";
export declare const CreateInviteDtoSchema: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
}>;
export type CreateInviteDto = Static<typeof CreateInviteDtoSchema>;
export declare const InviteDtoSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    inviterId: import("@sinclair/typebox").TString;
    inviterFullName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    eventId: import("@sinclair/typebox").TString;
    inviteeId: import("@sinclair/typebox").TString;
    eventTitle: import("@sinclair/typebox").TString;
    eventStartDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    eventEndDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    status: import("@sinclair/typebox").TString;
}>;
export type InviteDto = Static<typeof InviteDtoSchema>;
