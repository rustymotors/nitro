import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserFromDatabaseByUsername } from "../src/core/Database";
import { DBUser } from "../src/core/models/DBUser";
import type { Model } from "sequelize";

vi.mock("../src/core/models/DBUser", () => ({
	DBUser: {
		findOne: vi.fn(),
	},
}));

describe("getUserFromDatabaseByUsername", () => {
	const mockUser = {
		username: "testuser",
		passwordHash: "hashedpassword",
		customerId: "customer123",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns null if username is empty", async () => {
		const result = await getUserFromDatabaseByUsername("");
		expect(result).toBeNull();
	});

	it("returns null if username is not a string", async () => {
		// @ts-expect-error testing non-string input
		const result = await getUserFromDatabaseByUsername(123);
		expect(result).toBeNull();
	});

	it("returns null if user is not found", async () => {
		(DBUser.findOne as ReturnType<typeof vi.fn>).mockResolvedValue(null);
		const result: {
			username: string;
			passwordHash: string;
			customerId: string;
		} | null = await getUserFromDatabaseByUsername("notfound");
		expect(DBUser.findOne).toHaveBeenCalledWith({
			where: { username: "notfound" },
		});
		expect(result).toBeNull();
	});

	it("returns user data if user is found", async () => {
		(DBUser.findOne as ReturnType<typeof vi.fn>).mockResolvedValue(
			mockUser as unknown as Model,
		);
		const result: {
			username: string;
			passwordHash: string;
			customerId: string;
		} | null = await getUserFromDatabaseByUsername("testuser");
		expect(DBUser.findOne).toHaveBeenCalledWith({
			where: { username: "testuser" },
		});
		expect(result).toEqual({
			username: "testuser",
			passwordHash: "hashedpassword",
			customerId: "customer123",
		});
	});
});
