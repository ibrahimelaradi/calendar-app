import { Type, Static } from "@sinclair/typebox";

export const SignupParamsSchema = Type.Object({
	username: Type.String({ minLength: 4, maxLength: 32 }),
	password: Type.String({ minLength: 8, maxLength: 64 }),
	email: Type.String({ format: "email" }),
	fullName: Type.Optional(Type.String({ maxLength: 128 })),
	birthDate: Type.Optional(Type.Date()),
});
export type SignupParams = Static<typeof SignupParamsSchema>;

export const LoginParamsSchema = Type.Object({
	username: Type.String({ minLength: 4, maxLength: 32 }),
	password: Type.String({ minLength: 8, maxLength: 64 }),
});
export type LoginParams = Static<typeof LoginParamsSchema>;

export const UserDtoSchema = Type.Object({
	id: Type.String(),
	username: Type.String(),
	email: Type.String(),
	fullName: Type.Optional(Type.String()),
	birthDate: Type.Optional(Type.Date()),
	createdAt: Type.Date(),
	updatedAt: Type.Date(),
});
export type UserDto = Static<typeof UserDtoSchema>;
