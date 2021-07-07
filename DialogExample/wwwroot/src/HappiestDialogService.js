import { BaseService } from "./BaseService";
export class HappiestDialogService extends BaseService {
    constructor() {
        super();
        this.url = "?handler=HappiestPlaceContent";
    }
    getHappiestComponent() {
        const request = new Request(this.url, { method: "get" });
        return fetch(request)
            .then(this.validateResponse)
            .then(this.readResponseAsText);
    }
}
