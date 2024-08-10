import { Type } from "@sinclair/typebox";
import dayjs from "dayjs";

export const StringDate = Type.Transform(
	Type.Union([Type.Date(), Type.String()])
)
	.Decode((date) => dayjs(date).toDate())
	.Encode((date) => dayjs(date).format());
