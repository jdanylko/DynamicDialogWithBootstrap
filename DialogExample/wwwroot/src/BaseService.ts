export class BaseService {

    protected validateResponse(response: Response) {
        if (!response.ok) {
            const status = `${response.status} - ${response.statusText}`;
            throw Error(status);
        }
        return response;
    }

    protected readResponseAsJson<T>(response: Response) {
        return response.json();
    }

    protected readResponseAsText(response: Response) {
        return response.text();
    }

    protected logError(error: Error) {
        console.log('Issue w/ fetch call: \n', error);
    }
}