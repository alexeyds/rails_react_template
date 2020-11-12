import jutest from "test/browser_jutest";
import { renderHook, current, cleanup } from "test/support/hooks_renderer";
import useAPIRequest from "api/use_api_request";

jutest("useAPIRequest", function(t) {
  function apiRequest() {
    return Promise.resolve('stub request');
  }

  t.describe("basicUsage", function(t) {
    t.test("has loading state initially", async function(t) {
      let hook = renderHook(() => useAPIRequest(apiRequest));
      let [state] = current(hook);

      t.equal(state.response, null);
      t.equal(state.isLoading, true);
      t.equal(state.error, null);
    });

    t.test("has executeRequest action", function(t) {
      let hook = renderHook(() => useAPIRequest(apiRequest));
      let [, executeRequest] = current(hook);
      t.equal(typeof executeRequest, 'function');
    });
  });

  t.describe("executeRequest()", function(t) {
    function executeRequest(hook) {
      return current(hook)[1]();
    }

    t.test("executes request and parses it into loaded state", async function(t) {
      let hook = renderHook(() => useAPIRequest(apiRequest));

      await executeRequest(hook);

      let [state] = current(hook);
      t.equal(state.isLoading, false);
      t.equal(state.error, null);
      t.assert(state.response);
    });

    t.test("handles promise rejections as errors", async function(t) {
      let request = () => Promise.reject(new Error('error!'));
      let hook = renderHook(() => useAPIRequest(request));

      await executeRequest(hook);

      let [state] = current(hook);
      t.equal(state.isLoading, false);
      t.equal(state.error.message, 'error!');
      t.equal(state.response, null);
    });

    t.test("passes provided arguments into request function", async function(t) {
      let args;
      let requestFunction = function() {
        args = arguments;
        return apiRequest();
      };
      let hook = renderHook(() => useAPIRequest(requestFunction));
      let [, executeRequest] = current(hook);

      await executeRequest('foo', 'bar');

      t.equal(args[0], 'foo');
      t.equal(args[1], 'bar');
    });

    t.test("resets state to loading on subsequent calls", async function(t) {
      let hook = renderHook(() => useAPIRequest(apiRequest));

      await executeRequest(hook);
      executeRequest(hook);

      let [state] = current(hook);
      t.equal(state.isLoading, true);
    });

    t.test("stays the same between changes", async function(t) {
      let hook = renderHook(() => useAPIRequest(apiRequest));
      let [, oldExecuteRequest] = current(hook);

      await oldExecuteRequest();

      t.equal(current(hook)[1], oldExecuteRequest);
    });

    t.test("does not display warnings if hook was unmounted during fetch", async function() {
      let hook = renderHook(() => useAPIRequest(apiRequest));
      await cleanup();
      executeRequest(hook);
    });
  });
});