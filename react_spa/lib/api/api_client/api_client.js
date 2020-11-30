import { fetchJSON } from "api/api_client/request";
import normalizeApiResponse from "api/api_client/response";

let apiClient = {
  executeRequest: function() {
    return fetchJSON(...arguments).then(normalizeApiResponse);
  }
};

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  apiClient[method] = function(path, init={}) { 
    return apiClient.executeRequest(path, { ...init, method: method.toUpperCase() });
  };
});

export default apiClient;