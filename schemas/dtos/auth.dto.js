"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDtoSchema = exports.LoginParamsSchema = exports.SignupParamsSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.SignupParamsSchema = typebox_1.Type.Object({
    username: typebox_1.Type.String({ minLength: 4, maxLength: 32 }),
    password: typebox_1.Type.String({ minLength: 8, maxLength: 64 }),
    email: typebox_1.Type.String({ format: "email" }),
    fullName: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 128 })),
    birthDate: typebox_1.Type.Optional(typebox_1.Type.Date()),
});
exports.LoginParamsSchema = typebox_1.Type.Object({
    username: typebox_1.Type.String({ minLength: 4, maxLength: 32 }),
    password: typebox_1.Type.String({ minLength: 8, maxLength: 64 }),
});
exports.UserDtoSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    username: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    fullName: typebox_1.Type.Optional(typebox_1.Type.String()),
    birthDate: typebox_1.Type.Optional(typebox_1.Type.Date()),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
});
