"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteDtoSchema = exports.CreateInviteDtoSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const common_1 = require("./common");
exports.CreateInviteDtoSchema = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
});
exports.InviteDtoSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    inviterId: typebox_1.Type.String(),
    inviterFullName: typebox_1.Type.Optional(typebox_1.Type.String()),
    eventId: typebox_1.Type.String(),
    inviteeId: typebox_1.Type.String(),
    eventTitle: typebox_1.Type.String(),
    eventStartDate: common_1.StringDate,
    eventEndDate: common_1.StringDate,
    status: typebox_1.Type.String(),
});
