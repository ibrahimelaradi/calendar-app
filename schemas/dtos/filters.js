"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.FiltersSchema = typebox_1.Type.Object({
    search: typebox_1.Type.Optional(typebox_1.Type.String()),
    fromDate: typebox_1.Type.Optional(typebox_1.Type.String({ format: "date" })),
    toDate: typebox_1.Type.Optional(typebox_1.Type.String({ format: "date" })),
    userId: typebox_1.Type.Optional(typebox_1.Type.String()),
    eventId: typebox_1.Type.Optional(typebox_1.Type.String()),
});
