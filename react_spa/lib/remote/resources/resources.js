import request from "remote/request";
import routes from "./routes";

export default {
  helloWorld: {
    getApiVersion: () => request.get(routes.helloWorldPath())
  },

  sessions: {
    logout: () => request.delete(routes.sessionsPath()),
    login: body => request.post(routes.sessionsPath(), { body })
  }
};
