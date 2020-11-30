import request from "remote/request";
import routes from "remote/routes";

export default {
  destroy: () => request.delete(routes.sessionsPath()),
  create: body => request.post(routes.sessionsPath(), { body })
};
