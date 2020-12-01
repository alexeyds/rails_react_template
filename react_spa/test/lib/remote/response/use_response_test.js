import jutest from "test/browser_jutest";
import { renderHook, current } from "test/support/hooks_renderer";
import { Response, useResponse } from "remote/response";

jutest("useResponse()", s => {
  function delayedPromise() {
    return new Promise(() => {});
  }

  function responseHook(request=delayedPromise) {
    return renderHook(() => useResponse(request));
  }

  s.test("has initial state", t => {
    let [response, doRequest] = current(responseHook());

    t.equal(response.state, Response.STATES.initial);
    t.equal(typeof doRequest, 'function');
  });

  s.test("has loading state", async t => {
    let hook = responseHook();

    let [, doRequest] = current(hook);
    doRequest();
    let [response] = current(hook);

    t.equal(response.isLoading, true);
  });

  s.test("processes fetch response", async t => {
    fetch.mock('/test', { response: { body: 'test' } });
    let hook = responseHook(() => fetch('/test'));

    let [, doRequest] = current(hook);
    await doRequest();
    let [response] = current(hook);

    t.equal(response.body, 'test');
    t.equal(response.isSuccess, true);
  });

  s.test("passes arguments to request function", t => {
    let args;
    let request = function() {
      args = [...arguments];
      return delayedPromise();
    };

    let hook = responseHook(request);
    let [, doRequest] = current(hook);
    doRequest('arg1', 'arg2');

    t.same(args, ['arg1', 'arg2']);
  });

  s.test("preserves doRequest function identity", async t => {
    let hook = responseHook();

    let [, oldDoRequest] = current(hook);
    oldDoRequest();
    let [, newDoRequest] = current(hook);

    t.equal(oldDoRequest, newDoRequest);
  });

  // // TODO: Add this test when fetcherino can handle synchronous mock validation
  // s.test("processes fetch rejections", async t => {
  //   let hook = responseHook(() => Promise.reject('foobar'));

  //   let [, doRequest] = current(hook);
  //   await doRequest();
  //   let [response] = current(hook);

  //   t.equal(response.isErrored, true);
  // });
});
