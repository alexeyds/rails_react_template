import { fetchJSON } from "api/api_client/request";
import { parseJSON } from "api/api_client/response";

let apiClient = {
  executeRequest: function() {
    return fetchJSON(...arguments).then(parseJSON);
  }
};

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  apiClient[method] = function(path, init={}) { 
    return apiClient.executeRequest(path, { ...init, method: method.toUpperCase() });
  };
});

export default apiClient;