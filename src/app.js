const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
require('dotenv').config()
const dbConnection = require('./configs/database')
const responseHandler = require('./helpers/responseHandler')
const ApiError = require('./helpers/errorHandler')
const tables = require('./models/index')
const route = require('./routers/index')
const { sequelizeErrorHandler } = require('./helpers/sequelizeErrorHandler')

class Application {
	constructor() {
		this.app = express()
		this.port = process.env.PORT || 5050
		this.plugins()
		this.routers()
		this.tables = tables()
		this.start()
	}

	plugins() {
		this.app.use(cors())
		this.app.use(bodyParser.urlencoded({ extended: false }))
		this.app.use(bodyParser.json())
		this.app.use(helmet())
		this.app.use(morgan('dev'))
		this.app.use(compression())
	}

	routers() {
		this.app.get('/test', (req, res, next) => {
			responseHandler.success(res, 'Test route')
		})

		this.app.use('/', route)

		this.app.use((req, res, next) => {
			next(ApiError.notFound('Page not found!'))
		})

		this.app.use((error, req, res, next) => {
			console.error('Error:', error.message)

			if (error.name.includes('Sequelize')) {
				const errorsForSequelize = sequelizeErrorHandler(error)
				return res
					.status(422)
					.send(
						ApiError.unprocessableEntity(
							'Please check your input',
							errorsForSequelize
						)
					)
			}

			return res.status(error.status || error.code || 500).send(error)
		})
	}

	start() {
		this.app.listen(this.port, () => {
			console.log('App is running at port ' + this.port)
			dbConnection
		})
	}
}

new Application()
