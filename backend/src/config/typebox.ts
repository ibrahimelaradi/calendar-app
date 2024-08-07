import { FormatRegistry } from "@sinclair/typebox";
import isEmail from "validator/lib/isEmail";
import isDate from "validator/lib/isDate";

FormatRegistry.Set("email", isEmail);
FormatRegistry.Set("date", isDate);
FormatRegistry.Set("date-time", isDate);
