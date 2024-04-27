const { constants } = require('http2')

module.exports = {
	success: (res, message, data) => {
		res.status(200).json({
			code: constants.HTTP_STATUS_OK,
			message,
			data
		})
	},
	error: (res, message, data) => {
		res.status(200).json({
			code: 500,
			message,
			data
		})
	}
}
