export type UserLike = {
	id: number;
	username: string;
	roles: Array<string>;
}

export class User {
	id: number;
	username: string;
	roles: Array<string>;

	static fromJSON = (json: UserLike) => {
		if("id" in json && "username" in json && ("roles" in json && Array.isArray(json.roles))) {
			return new User(json.id, json.username, json.roles);
		} else {
			throw new Error("Invalid JSON passed to User constructor.");
		}
	};

	constructor(id: number, username: string, roles: Array<string>) {
		this.id = id;
		this.username = username;
		this.roles = roles;
	}
}