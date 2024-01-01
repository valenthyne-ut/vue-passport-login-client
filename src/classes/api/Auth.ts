import type { User } from "../User";
import { BaseAPI } from ".";

export interface LoginResponse {
	jwtToken: string;
	user: User;
	error?: string;
}

export interface LogoutResponse {
	error?: string;
}

export interface GetAuthDetailsResponse {
	user: {
		name: string;
		roles: Array<string>;
	},
	error?: string
}

export class AuthAPI extends BaseAPI {
	constructor() {
		super(BaseAPI.BASEAPI_DEFAULT_PATH_STRING + "/auth");
	}

	async login(username: string, password: string): Promise<LoginResponse> {
		const requestData = JSON.stringify({
			"username": username,
			"password": password
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
			throw new Error((await response.json() as LoginResponse).error);
		}
	}

	async logout(jwtToken: string): Promise<LogoutResponse> {
		throw new Error("Not implemented");
	}

	async getAuthDetails(jwtToken: string): Promise<GetAuthDetailsResponse> {
		const requestOptions: RequestInit = {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${jwtToken}`
			}
		};
		const response = await fetch(this.apiPath, requestOptions);
		if(response.ok) {
			return await response.json();
		} else {
			throw new Error((await response.json() as GetAuthDetailsResponse).error);
		}
	}
}