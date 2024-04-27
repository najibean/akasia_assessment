const { DataTypes, Sequelize, UUIDV4 } = require('sequelize')
const sequelize = require('../configs/database')

const vouchers = () => {
	return sequelize.define('vouchers', {
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		start_date: {
			type: DataTypes.DATE
		},
		end_date: {
			type: DataTypes.DATE
		},
		amount: {
			type: DataTypes.INTEGER
		}
	})
}

module.exports = vouchers
