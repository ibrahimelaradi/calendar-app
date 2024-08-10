import { Static } from "@sinclair/typebox";
export declare const CreateEventParamsSchema: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    endDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    isReoccurring: import("@sinclair/typebox").TBoolean;
    isPublic: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type CreateEventParams = Static<typeof CreateEventParamsSchema>;
export declare const UpdateEventParamsSchema: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    endDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    isReoccurring: import("@sinclair/typebox").TBoolean;
    isPublic: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type UpdateEventParams = Static<typeof UpdateEventParamsSchema>;
export declare const EventDtoSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    userId: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    endDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    isReoccurring: import("@sinclair/typebox").TBoolean;
    isPublic: import("@sinclair/typebox").TBoolean;
    createdAt: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
    updatedAt: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
}>;
export type EventDto = Static<typeof EventDtoSchema>;
