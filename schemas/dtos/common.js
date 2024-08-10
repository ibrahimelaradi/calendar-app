"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringDate = void 0;
const typebox_1 = require("@sinclair/typebox");
const dayjs_1 = __importDefault(require("dayjs"));
exports.StringDate = typebox_1.Type.Transform(typebox_1.Type.Union([typebox_1.Type.Date(), typebox_1.Type.String()]))
    .Decode((date) => (0, dayjs_1.default)(date).toDate())
    .Encode((date) => (0, dayjs_1.default)(date).format());
