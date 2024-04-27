const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
require('dotenv').config()
const dbConnection = require('./configs/database')

class Application {
	constructor() {
		this.app = express()
		this.port = process.env.PORT || 5050
		this.plugins()
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

	start() {
		this.app.listen(this.port, () => {
			console.log('App is running at port ' + this.port)
			dbConnection
		})
	}
}

new Application()
