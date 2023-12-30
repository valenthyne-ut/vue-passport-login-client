export type UserLike = {
	name: string;
	roles: Array<string>;
}

export class User {
	name: string;
	roles: Array<string>;

	static fromJSON = (json: UserLike) => {
		if("username" in json && ("roles" in json && Array.isArray(json.roles))) {
			return new User(json.name, json.roles);
		} else {
			throw new Error("Invalid JSON passed to User constructor.");
		}
	};

	constructor(name: string, roles: Array<string>) {
		this.name = name;
		this.roles = roles;
	}
}