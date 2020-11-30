import request from "remote/request";
import routes from "remote/routes";

export default {
  getApiVersion: () => request.get(routes.helloWorldPath())
};
