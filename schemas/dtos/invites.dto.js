"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInviteDtoSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.CreateInviteDtoSchema = typebox_1.Type.Object({
    userId: typebox_1.Type.String(),
});
