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

import { getUserFromDatabaseByUsername } from "./Database";

export class UserWebLoginRequest {
	public Username: string;
	public Password: string;

	constructor(username: string, password: string) {
		this.Username = username;
		this.Password = password;
	}
}

export class UserWebLoginResponseValid {
	public Token: string;

	constructor(token: string) {
		this.Token = token;
	}

	toString(): string {
		return `Token: ${this.Token}`;
	}
}

export class UserWebLoginResponseInvalid {
	public ReasonCode = "";
	public ReasonMessage = "";

	constructor(reasonCode: string, reasonMessage: string) {
		this.ReasonCode = reasonCode;
		this.ReasonMessage = reasonMessage;
	}

	toString(): string {
		return `ReasonCode: ${this.ReasonCode}, ReasonMessage: ${this.ReasonMessage}`;
	}
}

export class User {
	public Username: string;
	public CustomerId: string;
	public passwordHash: string | undefined;

	constructor(username: string, customerId: string) {
		this.Username = username;
		this.CustomerId = customerId;
	}
	public async loginUser(
		request: UserWebLoginRequest,
	): Promise<UserWebLoginResponseValid | UserWebLoginResponseInvalid> {
		const user = await getUserFromDatabaseByUsername(request.Username);

        if (user === null) {
			return new UserWebLoginResponseInvalid(
				"user_not_found",
				"The user does not exist.",
			);
		}
		this.passwordHash = user.passwordHash; // Assume user object has a passwordHash property
		// Simulate password verification
		// In a real application, you would use a secure method to verify the password hash
		if (!this.passwordHash) {
			return new UserWebLoginResponseInvalid(
				"password_not_set",
				"The password is not set for this user.",
			);
		}
		return new UserWebLoginResponseValid("valid_token"); // Simulate a valid token response
	}

	public toString(): string {
		return `Username: ${this.Username}, CustomerId: ${this.CustomerId}`;
	}
}
