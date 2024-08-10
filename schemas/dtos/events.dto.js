"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDtoSchema = exports.UpdateEventParamsSchema = exports.CreateEventParamsSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const common_1 = require("./common");
exports.CreateEventParamsSchema = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    startDate: common_1.StringDate,
    endDate: common_1.StringDate,
    isReoccurring: typebox_1.Type.Boolean(),
    isPublic: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.UpdateEventParamsSchema = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    startDate: common_1.StringDate,
    endDate: common_1.StringDate,
    isReoccurring: typebox_1.Type.Boolean(),
    isPublic: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.EventDtoSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    userId: typebox_1.Type.String(),
    title: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    startDate: common_1.StringDate,
    endDate: common_1.StringDate,
    isReoccurring: typebox_1.Type.Boolean(),
    isPublic: typebox_1.Type.Boolean(),
    createdAt: common_1.StringDate,
    updatedAt: common_1.StringDate,
});
