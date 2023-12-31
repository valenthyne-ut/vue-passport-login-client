import { BaseAPI } from ".";

export interface CreateAccountResponse {
	username: string;
	password: string;
	roles: Array<string>;
	error?: string;
}

export class AccountAPI extends BaseAPI {
	constructor() {
		super(BaseAPI.BASEAPI_DEFAULT_PATH_STRING + "/account");
	}

	async createAccount(role: string): Promise<CreateAccountResponse> {
		const requestData = JSON.stringify({ 
			"role": role 
		});
		const requestOptions: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: requestData
		};
		const response = await fetch(this.apiPath, requestOptions);
		if(response.ok) { 
			return await response.json();
		} else {
			throw new Error((await response.json() as CreateAccountResponse).error);
		}
	}
}