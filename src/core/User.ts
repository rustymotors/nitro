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

/**
 * Represents a web login request containing a username and password.
 */
export class UserWebLoginRequest {
	public Username: string;
	public Password: string;

	/**
	 * Creates a new UserWebLoginRequest.
	 * @param username - The username for login.
	 * @param password - The password for login.
	 */
	constructor(username: string, password: string) {
		this.Username = username;
		this.Password = password;
	}
}

/**
 * Represents a successful web login response containing a token.
 */
export class UserWebLoginResponseValid {
	public Token: string;

	/**
	 * Creates a new UserWebLoginResponseValid.
	 * @param token - The authentication token.
	 */
	constructor(token: string) {
		this.Token = token;
	}

	/**
	 * Returns a string representation of the response.
	 */
	toString(): string {
		return `Token: ${this.Token}`;
	}
}

/**
 * Represents an invalid web login response with a reason code and message.
 */
export class UserWebLoginResponseInvalid {
	public ReasonCode = "";
	public ReasonMessage = "";

	/**
	 * Creates a new UserWebLoginResponseInvalid.
	 * @param reasonCode - The code indicating the reason for failure.
	 * @param reasonMessage - The message describing the reason for failure.
	 */
	constructor(reasonCode: string, reasonMessage: string) {
		this.ReasonCode = reasonCode;
		this.ReasonMessage = reasonMessage;
	}

	/**
	 * Returns a string representation of the response.
	 */
	toString(): string {
		return `ReasonCode: ${this.ReasonCode}, ReasonMessage: ${this.ReasonMessage}`;
	}
}

/**
 * Represents a user in the system with authentication capabilities.
 *
 * @remarks
 * The `User` class encapsulates user-related data and provides methods for user authentication.
 * It stores the username, customer ID, and an optional password hash.
 *
 * @example
 * ```typescript
 * const user = new User("john_doe", "customer123");
 * const response = await user.loginUser(loginRequest);
 * ```
 */
export class User {
	public Username: string;
	public CustomerId: string;
	public passwordHash: string | undefined;

	/**
	 * Creates a new User instance.
	 * @param username - The user's username.
	 * @param customerId - The user's customer ID.
	 */
	constructor(username: string, customerId: string) {
		this.Username = username;
		this.CustomerId = customerId;
	}

	/**
	 * Attempts to log in the user with the provided login request.
	 * @param request - The login request containing username and password.
	 * @returns A promise resolving to a valid or invalid login response.
	 */
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

	/**
	 * Returns a string representation of the user.
	 */
	public toString(): string {
		return `Username: ${this.Username}, CustomerId: ${this.CustomerId}`;
	}
}
