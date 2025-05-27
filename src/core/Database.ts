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

import { DBUser } from "./models/DBUser";

/**
 * Retrieves a user from the database by their username.
 *
 * @param username - The username of the user to retrieve.
 * @returns A promise that resolves to an object containing the user's username, password hash, and customer ID,
 *          or `null` if the user is not found or the input is invalid.
 */
export async function getUserFromDatabaseByUsername(
	username: string,
): Promise<{
    username: string;
	passwordHash: string;
	customerId: string;
} | null> {
	if (!username) {
		return Promise.resolve(null);
	}

	// Ensure username is a string
	if (typeof username !== "string") {
		return Promise.resolve(null);
	}

	// Find the user in the database
	const user = await DBUser.findOne({
		where: { username },
	});

	if (!user) {
		return Promise.resolve(null);
	}
		return Promise.resolve({
			username: user.username,
			customerId: user.customerId,
			passwordHash: user.passwordHash,
		});
	
}
