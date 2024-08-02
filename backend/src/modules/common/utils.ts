import { Static, type TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Value } from "@sinclair/typebox/value";
import { ValidationError } from "./error";

export function validateWithSchema(
	schema: TSchema,
	value: unknown
): ValidationError | undefined {
	const Compiled = TypeCompiler.Compile(schema);
	const errors = [...Compiled.Errors(value)];
	if (errors.length > 0) {
		const error = ValidationError.make("Validation error");
		for (const { path, message } of errors) {
			error.addError(path.split("/").filter(Boolean).join("."), message);
		}
		return error;
	}
}

export function castWithSchema<T extends TSchema>(
	schema: T,
	value: unknown
): Static<T> {
	return Value.Cast(schema, value);
}
