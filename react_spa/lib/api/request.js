import { fetchJSON } from "utils/improved_fetch";

let Request = {};

function execute(path, init={}) {
  return fetchJSON(path, init);
}

Request.execute = execute;

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  Request[method] = function(path, init={}) { 
    return execute(path, { ...init, method: method.toUpperCase() });
  };
});

export default Request;