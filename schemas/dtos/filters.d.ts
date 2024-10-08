import { Static } from "@sinclair/typebox";
export declare const FiltersSchema: import("@sinclair/typebox").TObject<{
    search: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fromDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>>;
    toDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>>;
    userId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    inviteeId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    inviterId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    inviteStatus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    eventId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    pageSize: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    order: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    orderBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type Filters = Static<typeof FiltersSchema>;
