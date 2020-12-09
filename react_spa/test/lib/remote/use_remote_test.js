import jutest from "test/browser_jutest";
import { renderHook, current } from "test/support/hooks_renderer";
import request from "remote/request";
import { useRemote, Remote } from "remote";

jutest("useRemote()", s => {
  function fetchResponse(response) {
    fetch.mock('/use-remote-test', { response });
    return request('/use-remote-test');
  }

  let buildHook = request => renderHook(() => useRemote(request));

  let getRemote    = hook => current(hook)[0];
  let getDoRequest = hook => current(hook)[1];

  s.test("returns remote in initial state", t => {
    let hook = buildHook(fetchResponse);

    t.equal(getRemote(hook).state, Remote.STATES.initial);
    t.equal(typeof getDoRequest(hook), 'function');
  });

  s.test("transforms remote to loading state on request", async t => {
    let response = await fetchResponse();
    let hook = buildHook(() => Promise.resolve(response));

    getDoRequest(hook)();

    t.equal(getRemote(hook).state, Remote.STATES.loading);
  });

  s.test("passes arguments to request function and processes response", async t => {
    let hook = buildHook(fetchResponse);

    await getDoRequest(hook)({ body: 'hello' });

    let remote = getRemote(hook);
    t.equal(remote.state, Remote.STATES.success);
    t.equal(remote.response.body, 'hello');
  });

  s.test("preserves request function identity", async t => {
    let hook = buildHook(fetchResponse);

    let oldDoRequest = getDoRequest(hook);
    await oldDoRequest();
    let newDoRequest = getDoRequest(hook);

    t.equal(oldDoRequest, newDoRequest);
  });

  // // TODO: enable this test when fetcherino can handle synchronous mock validation
  // s.test("processes rejections", async t => {
  //   let hook = buildHook(() => Promise.reject(new Error('Network error')));

  //   await getDoRequest(hook)();

  //   let remote = getRemote(hook);
  //   t.equal(remote.state, Remote.STATES.failed);
  //   t.match(remote.error.message, /Network error/);
  // });
});
