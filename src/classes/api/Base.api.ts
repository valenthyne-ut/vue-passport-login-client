export class BaseAPI {
	apiPath: string;

	static BASEAPI_DEFAULT_PATH_STRING: string = "/api";

	constructor(apiPath: string) {
		this.apiPath = apiPath;
	}
}