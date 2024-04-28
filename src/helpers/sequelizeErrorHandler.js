exports.sequelizeErrorHandler = error => {
	const catchedErrors = error.errors.map(err => {
		return {
			message: err.message,
			path: err.path,
			value: err.value
		}
	})

	return catchedErrors
}
