import jutest from "test/browser_jutest";
import { renderHook, current } from "test/support/hooks_renderer";
import { useRemoteRequest, states } from "remote_request";

jutest("useRemoteRequest()", s => {
  s.test("has inital state on creation", t => {
    let hook = renderHook(() => useRemoteRequest(() => {}));
    let [request, executeRequest] = current(hook);

    t.equal(request.state, states.initial);
    t.equal(request.response, null);
    t.equal(request.error, null);
    t.equal(typeof executeRequest, 'function');
  });

  s.describe("submit()", s => {
    function executeRequest(hook) {
      let [, execute] = current(hook);
      return execute(hook);
    }

    s.test("sets state to loading", t => {
      let hook = renderHook(() => useRemoteRequest(async () => {}));

      executeRequest(hook);
      let [request] = current(hook);

      t.equal(request.state, states.loading);
      t.equal(request.response, null);
      t.equal(request.error, null);
    });

    s.test("sets state to loaded", async t => {
      let hook = renderHook(() => useRemoteRequest(async () => 'my response'));

      await executeRequest(hook);
      let [request] = current(hook);

      t.equal(request.state, states.loaded);
      t.equal(request.response, 'my response');
      t.equal(request.error, null);
    });

    s.test("sets state to errored", async t => {
      let hook = renderHook(() => useRemoteRequest(() => Promise.reject('error')));

      await executeRequest(hook);
      let [request] = current(hook);

      t.equal(request.state, states.errored);
      t.equal(request.response, null);
      t.equal(request.error, 'error');
    });

    s.test("passes arguments to request function", async t => {
      let args;
      let hook = renderHook(() => useRemoteRequest(async function() {
        args = [...arguments];
      }));

      let [, executeRequest] = current(hook);
      await executeRequest(1, 2);

      t.same(args, [1, 2]);
    });

    s.test("stays the same between renders", async t => {
      let request = async () => {};
      let hook = renderHook(() => useRemoteRequest(request));

      let [, oldSubmit] = current(hook);
      await executeRequest(hook);
      let [, newSubmit] = current(hook);

      t.equal(oldSubmit, newSubmit);
    });
  });
});
