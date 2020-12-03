import request from "remote/request";
import routes from "./routes";

export default {
  helloWorld: {
    getApiVersion: () => request.get(routes.helloWorldPath())
  },

  sessions: {
    destroy: () => request.delete(routes.sessionsPath()),
    create: body => request.post(routes.sessionsPath(), { body })
  }
};
