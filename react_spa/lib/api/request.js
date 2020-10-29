import { fetchJSON } from "utils/improved_fetch";

let Request = {
  execute: (path, init={}) => {
    return fetchJSON(path, init);
  }
};

['get', 'post', 'patch', 'put', 'delete'].forEach(method => {
  Request[method] = function(path, init={}) { 
    return Request.execute(path, { ...init, method: method.toUpperCase() });
  };
});

export default Request;
