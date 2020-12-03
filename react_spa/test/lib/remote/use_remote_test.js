import jutest from "test/browser_jutest";
import { renderHook, current } from "test/support/hooks_renderer";
import request from "remote/request";
import { useRemote, Remote } from "remote";

jutest("useRemote()", s => {
  function fetchResponse(response) {
    fetch.mock('/use-remote-test', { response });
    return request('/use-remote-test');
  }

  function remoteHook(request) {
    return renderHook(() => useRemote(request));
  }

  s.test("returns remote in initial state", t => {
    let [remote, doRequest] = current(remoteHook(fetchResponse));

    t.equal(remote.state, Remote.STATES.initial);
    t.equal(typeof doRequest, 'function');
  });

  s.test("transforms remote to loading state on request", async t => {
    let response = await fetchResponse();
    let hook = remoteHook(() => Promise.resolve(response));

    let [, doRequest] = current(hook);
    doRequest();
    let [remote] = current(hook);

    t.equal(remote.state, Remote.STATES.loading);
  });

  s.test("passes arguments to request function and processes response", async t => {
    let hook = remoteHook(fetchResponse);

    let [, doRequest] = current(hook);
    await doRequest({ body: 'hello' });
    let [remote] = current(hook);

    t.equal(remote.state, Remote.STATES.success);
    t.equal(remote.response.body, 'hello');
  });

  s.test("preserves request function identity", async t => {
    let hook = remoteHook(fetchResponse);

    let [, oldDoRequest] = current(hook);
    await oldDoRequest();
    let [, newDoRequest] = current(hook);

    t.equal(oldDoRequest, newDoRequest);
  });

  // TODO: enable this test when fetcherino can handle synchronous mock validation
  // s.test("processes rejections", async t => {
  //   let hook = remoteHook(() => Promise.reject(new Error('Network error')));

  //   let [, doRequest] = current(hook);
  //   await doRequest();
  //   let [remote] = current(hook);

  //   t.equal(remote.state, Remote.STATES.failed);
  //   t.match(remote.error.message, /Network error/);
  // });
});
