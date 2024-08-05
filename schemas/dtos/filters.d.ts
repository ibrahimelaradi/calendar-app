import { Static } from "@sinclair/typebox";
export declare const FiltersSchema: import("@sinclair/typebox").TObject<{
    search: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fromDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDate>;
    toDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDate>;
    userId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type Filters = Static<typeof FiltersSchema>;
