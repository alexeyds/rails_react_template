import jutest from "test/browser_jutest";
import { fetchResponse } from "support/fetch";
import { renderHook, current, getState, getActions } from "support/hooks_renderer";
import useRemote from "remote/use_remote";

jutest("useRemote()", s => {
  let doRequest = (hook, ...args) => getActions(hook)(...args);

  s.setup(() => {
    let hook = renderHook(() => useRemote(fetchResponse));
    return { hook };
  });

  s.test("returns remote in initial state", (t, { hook }) => {
    let [remote, doRequest] = current(hook);

    t.equal(remote.isInitial, true);
    t.equal(remote.isLoading, false);
    t.equal(remote.response, null);
    t.equal(typeof doRequest, 'function');
  });

  s.test("transforms remote to loading state on request start", async (t, { hook }) => {
    let pendingRequest = doRequest(hook);
    let remote = getState(hook);

    t.equal(remote.isLoading, true);
    await pendingRequest;
  });

  s.test("transforms remote to success state on request end", async (t, { hook }) => {
    await doRequest(hook);
    let remote = getState(hook);

    t.equal(remote.isSuccess, true);
    t.equal(remote.response.status, 200);
    t.equal(remote.response, remote.lastOkResponse);
  });

  s.test("passes arguments to request function", async (t, { hook }) => {
    await doRequest(hook, { body: 'hello', status: 404 });
    let remote = getState(hook);

    t.equal(remote.isSuccess, false);
    t.equal(remote.isFailure, true);
    t.equal(remote.response.status, 404);
    t.equal(await remote.response.text(), 'hello');
  });

  s.test("preserves request function identity", async (t, { hook }) => {
    let oldDoRequest = getActions(hook);
    await oldDoRequest();
    let newDoRequest = getActions(hook);

    t.equal(oldDoRequest, newDoRequest);
  });

  // // TODO: enable this test when fetcherino can handle synchronous mock validation
  // s.test("processes rejections", async (t) => {
  //   let request = () => Promise.reject(new Error('Network error'));
  //   let hook = renderHook(() => useRemote(request));

  //   await doRequest(hook);
  //   let remote = getState(hook);

  //   t.equal(remote.isFailure, true);
  //   t.match(remote.rejection.message, /Network error/);
  // });
});
