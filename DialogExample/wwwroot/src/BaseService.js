export class BaseService {
    validateResponse(response) {
        if (!response.ok) {
            const status = `${response.status} - ${response.statusText}`;
            throw Error(status);
        }
        return response;
    }
    readResponseAsJson(response) {
        return response.json();
    }
    readResponseAsText(response) {
        return response.text();
    }
    logError(error) {
        console.log('Issue w/ fetch call: \n', error);
    }
}
