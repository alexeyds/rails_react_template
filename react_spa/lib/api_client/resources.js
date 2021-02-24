import r from "api_client/routes";
import conn from "api_client/json_connection";

export default {
  sessions: {
    destroy: () => conn.delete(r.sessions.indexPath()),
    create: post(r.sessions.passwordPath)
  },

  helloWorld: {
    show: () => conn.get(r.helloWorldPath())
  }
};

function post(route) {
  return (body) => conn.post(route(), { body });
}
