import { Sequelize } from "sequelize";

export const database: Sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "database.sqlite",
	logging: false,
	define: {
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		charset: "utf8",
		collate: "utf8_general_ci",
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});
