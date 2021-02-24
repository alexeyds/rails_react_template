import f from "support/api/fixtures";
import r from "api_client/routes";
import expect from "support/api/expectation";

export default {
  helloWorld: {
    show: expect.get(r.helloWorldPath, f.helloWorld)
  },
  sessions: {
    create: expect.post(r.sessions.passwordPath, f.session.show),
    destroy: expect.delete(r.sessions.indexPath, f.session.show)
  }
};
