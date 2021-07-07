import { BaseService } from "./BaseService";

export class HappiestDialogService extends BaseService {

    private url: string = "?handler=HappiestPlaceContent";

    constructor() {
        super();
    }

    public getHappiestComponent() {

        const request = new Request(this.url,
            { method: "get" });

        return fetch(request)
            .then(this.validateResponse)
            .then(this.readResponseAsText);
    }
}