/*
 *  This file is part of the Nitro project.
 *  This file is part of the core code for the application.
 *  Copyright (C) 2025 Molly Draven
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import type {InferAttributes, InferCreationAttributes,  } from "sequelize";
import { Model, DataTypes } from "sequelize";
import { database } from "../db.js";

export class DBUser extends Model<InferAttributes<DBUser>, InferCreationAttributes<DBUser>> {
    declare username: string;
    declare customerId: string;
    declare passwordHash: string;
}

DBUser.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		customerId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
	{
		sequelize: database,
		modelName: "User",
		tableName: "users",
		indexes: [
			{
				unique: true,
				fields: ["username"],
			},
		],
	},
);