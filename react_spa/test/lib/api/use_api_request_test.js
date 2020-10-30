import test from "test/browser_tape";
import { renderHook, current, cleanup } from "test/support/hooks_renderer";
import apiClient from "api/api_client";
import useAPIRequest from "api/use_api_request";

test("useAPIRequest", function(t) {
  function apiRequest(params) {
    return apiClient.get('/test-api-request', params);
  }

  function mockApiRequest(response) {
    fetch.mock('/test-api-request', { response });
  }

  t.test("basicUsage", function(t) {
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

  t.test("executeRequest()", function(t) {
    function getExecuteRequest(hook) {
      return current(hook)[1];
    }

    t.test("executes request and parses it into loaded state", async function(t) {
      let hook = renderHook(() => useAPIRequest(apiRequest));

      mockApiRequest();
      getExecuteRequest(hook)();
      await global.nextTick();

      let [state] = current(hook);
      t.equal(state.isLoading, false);
      t.equal(state.error, null);
      t.true(state.response);
    });

    t.test("handles promise rejections as errors", async function(t) {
      let request = () => Promise.reject(new Error('error!'));
      let hook = renderHook(() => useAPIRequest(request));

      getExecuteRequest(hook)();
      await global.nextTick();

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

      mockApiRequest();
      getExecuteRequest(hook)('foo', 'bar');
      await global.nextTick();

      t.equal(args[0], 'foo');
      t.equal(args[1], 'bar');
    });

    t.test("it resets state to loading on subsequent calls", async function(t) {
      await cleanup();
      let hook = renderHook(() => useAPIRequest(apiRequest));

      mockApiRequest();
      getExecuteRequest(hook)();
      await global.nextTick();

      mockApiRequest();
      getExecuteRequest(hook)();

      let [state] = current(hook);
      t.equal(state.isLoading, true);

      await global.nextTick();
    });

    t.test("stays the same between changes", async function(t) {
      let hook = renderHook(() => useAPIRequest(apiRequest));
      let oldExecuteRequest = getExecuteRequest(hook);

      mockApiRequest();
      oldExecuteRequest();
      await global.nextTick();

      t.equal(getExecuteRequest(hook), oldExecuteRequest);
    });

    t.test("does not display warnings if hook was unmounted during fetch", async function() {
      let hook = renderHook(() => useAPIRequest(apiRequest));
      await cleanup();

      mockApiRequest();
      getExecuteRequest(hook)();
      await global.nextTick();
    });
  });
});