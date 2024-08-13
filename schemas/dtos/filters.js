"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const common_1 = require("./common");
exports.FiltersSchema = typebox_1.Type.Object({
    search: typebox_1.Type.Optional(typebox_1.Type.String()),
    fromDate: typebox_1.Type.Optional(common_1.StringDate),
    toDate: typebox_1.Type.Optional(common_1.StringDate),
    userId: typebox_1.Type.Optional(typebox_1.Type.String()),
    eventId: typebox_1.Type.Optional(typebox_1.Type.String()),
    page: typebox_1.Type.Optional(typebox_1.Type.Number()),
    pageSize: typebox_1.Type.Optional(typebox_1.Type.Number()),
    order: typebox_1.Type.Optional(typebox_1.Type.String()),
    orderBy: typebox_1.Type.Optional(typebox_1.Type.String()),
});
