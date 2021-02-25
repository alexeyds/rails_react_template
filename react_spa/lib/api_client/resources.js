import r from "api_client/routes";
import conn from "api_client/json_connection";

export default {
  sessions: {
    destroy: () => conn.delete(r.sessions.indexPath()),
    create: (body) => conn.post(r.sessions.passwordPath(), { body })
  },

  helloWorld: {
    show: () => conn.get(r.helloWorldPath())
  }
};
