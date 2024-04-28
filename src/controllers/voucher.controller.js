const { UUIDV4 } = require('sequelize')
const sequelize = require('../configs/database')
const responseHandler = require('../helpers/responseHandler')
const uvc = require('../models/uvcTable')
const vouchers = require('../models/voucherTable')
const ApiError = require('../helpers/errorHandler')

class VoucherController {
	static async create(req, res, next) {
		try {
			const { name, start_date, end_date, amount, num_generations } = req.body

			await sequelize.sync({ alter: true })

			vouchers().hasMany(uvc())

			const afterCreatedData = await sequelize.transaction(async t => {
				const createdData = await vouchers().create(
					{
						name,
						start_date,
						end_date,
						amount
					},
					{
						transaction: t
					}
				)

				let dataUVC = []
				for (let i = 0; i < num_generations; i++) {
					dataUVC.push({
						id_voucher: createdData.id,
						start_date,
						end_date,
						amount,
						code: Math.random().toString().slice(2, 5)
					})
				}

				await uvc().bulkCreate(dataUVC, { validate: true, transaction: t })

				return createdData
			})

			return responseHandler.success(
				res,
				'Success create voucher',
				afterCreatedData
			)
		} catch (error) {
			next(error)
		}
	}

	static async update(req, res, next) {
		try {
			const { name, start_date, end_date, amount, num_generations } = req.body
			const idVoucher = req.params.voucher_id

			await sequelize.sync({ alter: true })

			vouchers().hasMany(uvc())

			const uvcsFound = await uvc().findAll({
				where: { id_voucher: idVoucher }
			})
			console.log(uvcsFound.length, '==> length of id_voucher')

			if (num_generations < uvcsFound.length) {
				throw ApiError.badRequest('path num_generations is lower than existing')
			}

			await sequelize.transaction(async t => {
				await vouchers().update(
					{
						name,
						start_date,
						end_date,
						amount
					},
					{ where: { id: idVoucher } },
					{
						transaction: t
					}
				)

				let dataUVC = []
				for (let i = 0; i < num_generations; i++) {
					dataUVC.push({
						id_voucher: idVoucher,
						start_date,
						end_date,
						amount,
						code: Math.random().toString().slice(2, 5)
					})
				}

				await uvc().bulkCreate(dataUVC, {
					updateOnDuplicate: ['id_voucher'],
					transaction: t
				})
			})

			return responseHandler.success(res, 'Success update voucher')
		} catch (error) {
			next(error)
		}
	}
}

module.exports = VoucherController
