export class ValidationError extends Error {
	errors?: Record<string, string[]>;

	constructor(message: string = "A validation error occurred") {
		super(message);
	}

	static make(message: string) {
		return new ValidationError(message);
	}

	setErrors(errors: Record<string, string[]>) {
		this.errors = errors;
		return this;
	}

	addError(field: string, message: string) {
		if (!this.errors) {
			this.errors = {};
		}

		if (!this.errors[field]) {
			this.errors[field] = [];
		}

		this.errors[field].push(message);
		return this;
	}

	toJson() {
		return {
			message: this.message,
			errors: this.errors,
		};
	}
}
