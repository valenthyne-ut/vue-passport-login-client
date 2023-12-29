import { BaseAPI } from ".";

export class AccountAPI extends BaseAPI {
	constructor() {
		super(BaseAPI.BASEAPI_DEFAULT_PATH_STRING + "/account");
	}

	async createAccount(role: string): Promise<User> {
		throw new Error("Not implemented.");
	}
}