import { FormatRegistry } from "@sinclair/typebox";
import isEmail from "validator/lib/isEmail";

FormatRegistry.Set("email", isEmail);
