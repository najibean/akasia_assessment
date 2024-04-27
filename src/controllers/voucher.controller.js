const sequelize = require('../configs/database')
const responseHandler = require('../helpers/responseHandler')
const vouchers = require('../models/voucherTable')

class VoucherController {
	static async create(req, res, next) {
		try {
			const { name, start_date, end_date, amount } = req.body

			await sequelize.sync({ alter: true })

			const createdData = await vouchers().create({
				name,
				start_date,
				end_date,
				amount
			})

			return responseHandler.success(res, 'Success create voucher', createdData)
		} catch (error) {
			next(error)
		}
	}

	static async update(req, res, next) {
		try {
			const { name, start_date, end_date, amount } = req.body

			await sequelize.sync({ alter: true })

			const createdData = await vouchers().create({
				name,
				start_date,
				end_date,
				amount
			})

			return responseHandler.success(res, 'Success create voucher', createdData)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = VoucherController
