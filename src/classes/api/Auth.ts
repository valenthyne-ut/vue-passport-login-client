import type { User } from "../User";
import { BaseAPI } from ".";

export class AuthAPI extends BaseAPI {
	constructor() {
		super(BaseAPI.BASEAPI_DEFAULT_PATH_STRING + "/auth");
	}

	async login(username: string, password: string): Promise<User> {
		throw new Error("Not implemented.");
	}
}