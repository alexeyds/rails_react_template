import config from "config";
import { fetchJSON } from "api_client/request";
import { handleServerResponse, handleFetchError } from "api_client/response";

let apiClient = {
  executeRequest: function() {
    // TODO: remove this when fetcherino is able to check mocks synchronously
    let errorHandler = config.env.isTest ? undefined : handleFetchError;

    return fetchJSON(...arguments).then(handleServerResponse, errorHandler);
  }
};

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  apiClient[method] = function(path, init={}) { 
    return apiClient.executeRequest(path, { ...init, method: method.toUpperCase() });
  };
});

export default apiClient;