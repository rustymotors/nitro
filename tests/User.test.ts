import { describe, it, expect } from "vitest";
import {
	UserWebLoginRequest,
	UserWebLoginResponseValid,
	UserWebLoginResponseInvalid,
	User,
} from "../src/core/User";

describe("UserWebLoginRequest", () => {
	it("should set username and password", () => {
		const req = new UserWebLoginRequest("foo", "bar");
		expect(req.Username).toBe("foo");
		expect(req.Password).toBe("bar");
	});
});

describe("UserWebLoginResponseValid", () => {
	it("should set token and toString returns correct string", () => {
		const res = new UserWebLoginResponseValid("tok123");
		expect(res.Token).toBe("tok123");
		expect(res.toString()).toContain("tok123");
	});
});

describe("UserWebLoginResponseInvalid", () => {
	it("should set reason code and message and toString returns correct string", () => {
		const res = new UserWebLoginResponseInvalid("bad", "fail");
		expect(res.ReasonCode).toBe("bad");
		expect(res.ReasonMessage).toBe("fail");
		expect(res.toString()).toContain("bad");
		expect(res.toString()).toContain("fail");
	});
});

describe("User", () => {
	it("should set username and customerId", () => {
		const user = new User("foo", "cid");
		expect(user.Username).toBe("foo");
		expect(user.CustomerId).toBe("cid");
		expect(user.toString()).toContain("foo");
		expect(user.toString()).toContain("cid");
	});
});
