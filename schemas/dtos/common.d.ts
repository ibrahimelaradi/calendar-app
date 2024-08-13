export declare const StringDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString]>, Date>;
export interface Paged<T> {
    items: T[];
    count: number;
}
