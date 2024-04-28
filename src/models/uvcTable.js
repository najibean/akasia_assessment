const { DataTypes, Sequelize, UUIDV4 } = require('sequelize')
const sequelize = require('../configs/database')
const vouchers = require('./voucherTable')

const uvc = () => {
	return sequelize.define(
		'uvc',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				primaryKey: true,
				allowNull: false
			},
			id_voucher: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: vouchers(),
					key: 'id'
				}
			},
			start_date: {
				type: DataTypes.DATE
			},
			end_date: {
				type: DataTypes.DATE
			},
			amount: {
				type: DataTypes.INTEGER
			},
			code: {
				type: DataTypes.STRING,
				unique: true
			}
		},
		{
			indexes: [
				{
					unique: false,
					fields: ['code']
				}
			]
		}
	)
}

module.exports = uvc
