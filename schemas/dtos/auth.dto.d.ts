import { Static } from "@sinclair/typebox";
export declare const SignupParamsSchema: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    fullName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    birthDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDate>;
}>;
export type SignupParams = Static<typeof SignupParamsSchema>;
export declare const LoginParamsSchema: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
}>;
export type LoginParams = Static<typeof LoginParamsSchema>;
export declare const UserDtoSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
    email: import("@sinclair/typebox").TString;
    fullName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    birthDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDate>;
    createdAt: import("@sinclair/typebox").TDate;
    updatedAt: import("@sinclair/typebox").TDate;
}>;
export type UserDto = Static<typeof UserDtoSchema>;
