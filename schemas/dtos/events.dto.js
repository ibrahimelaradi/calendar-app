"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDtoSchema = exports.UpdateEventParamsSchema = exports.CreateEventParamsSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.CreateEventParamsSchema = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    startDate: typebox_1.Type.Date(),
    endDate: typebox_1.Type.Optional(typebox_1.Type.Date()),
    allDay: typebox_1.Type.Boolean(),
    isReoccurring: typebox_1.Type.Boolean(),
    isPublic: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.UpdateEventParamsSchema = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    startDate: typebox_1.Type.Date(),
    endDate: typebox_1.Type.Optional(typebox_1.Type.Date()),
    allDay: typebox_1.Type.Boolean(),
    isReoccurring: typebox_1.Type.Boolean(),
    isPublic: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.EventDtoSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    userId: typebox_1.Type.String(),
    title: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    startDate: typebox_1.Type.Date(),
    endDate: typebox_1.Type.Date(),
    isReoccurring: typebox_1.Type.Boolean(),
    isPublic: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
});
