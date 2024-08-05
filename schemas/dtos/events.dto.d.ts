import { Static } from "@sinclair/typebox";
export declare const CreateEventParamsSchema: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TDate;
    endDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDate>;
    allDay: import("@sinclair/typebox").TBoolean;
    isReoccurring: import("@sinclair/typebox").TBoolean;
    isPublic: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type CreateEventParams = Static<typeof CreateEventParamsSchema>;
export declare const UpdateEventParamsSchema: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDate>;
    endDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDate>;
    allDay: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    isReoccurring: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    isPublic: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type UpdateEventParams = Static<typeof UpdateEventParamsSchema>;
