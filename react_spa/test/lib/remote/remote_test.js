import jutest from "test/browser_jutest";
import request from "remote/request";
import { Remote } from "remote";

jutest("Remote", s => {
  s.describe(".initial()", s => {
    s.test("returns remote in initial state", t => {
      let remote = Remote.initial();

      t.equal(remote.response, null);
      t.equal(remote.error, null);
      t.equal(remote.state, Remote.STATES.initial);
    });
  });

  s.describe(".loading()", s => {
    s.test("returns remote in loading state", t => {
      let remote = Remote.loading();

      t.equal(remote.response, null);
      t.equal(remote.error, null);
      t.equal(remote.state, Remote.STATES.loading);
    });
  });

  s.describe(".rejected()", s => {
    s.test("returns remote in failed state", t => {
      let remote = Remote.rejected(new Error('Network error'));

      t.equal(remote.response, null);
      t.equal(remote.state, Remote.STATES.failed);
    });

    s.test("sets Remote#error", t => {
      let { error } = Remote.rejected(new Error('Network error'));
      
      t.assert(error.message);
      t.assert(error.details);
    });
  });

  s.describe(".loaded()", s => {
    function fetchResponse(response) {
      fetch.mock('/remote-test', { response });
      return request('/remote-test');
    }

    s.test("returns remote in success state", async t => {
      let remote = await fetchResponse({ body: 'test' }).then(Remote.loaded);

      t.equal(remote.response.body, 'test');
      t.equal(remote.error, null);
      t.equal(remote.state, Remote.STATES.success);
    });

    s.test("returns remote in failed state if response was not successful", async t => {
      let remote = await fetchResponse({ status: 422 }).then(Remote.loaded);
      let error = remote.error;

      t.assert(error.message);
      t.assert(error.details);
      t.equal(remote.response.status, 422);
      t.equal(remote.state, Remote.STATES.failed);
    });
  });
});
