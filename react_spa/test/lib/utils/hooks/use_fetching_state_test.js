import test from "test/browser_tape";
import { renderHook, current, cleanup } from "test/support/hooks_renderer";
import useFetchingState from "utils/hooks/use_fetching_state";

test("useFetchingState", function(t) {
  function actions(hook) {
    let [, actions] = current(hook);
    return actions;
  }

  t.test("basicUsage", function(t) {
    t.test("has loading state initially", async function(t) {
      let hook = renderHook(() => useFetchingState());

      let [state] = current(hook);

      t.equal(state.response, null);
      t.equal(state.success, false);
      t.equal(state.isLoading, true);
      t.equal(state.error, null);
      t.equal(state.parsedBody, null);
    });

    t.test("has actions", function(t) {
      let hook = renderHook(() => useFetchingState());

      t.notEqual(actions(hook).startRequest, undefined);
    });
  });

  t.test("actions.startRequest()", function(t) {
    async function startRequest(hook, { response=undefined, bodyParser=undefined }={}) {
      fetch.mock('/test-hook', { response });
      actions(hook).startRequest(fetch('/test-hook'), { bodyParser });

      await fetch.nextTick();
      return current(hook);
    }

    t.test("sets state to loaded", async function(t) {
      let hook = renderHook(() => useFetchingState());
      let [state] = await startRequest(hook);

      t.equal(state.response.status, 200);
      t.equal(state.success, true);
      t.equal(state.isLoading, false);
      t.equal(state.error, null);
    });

    t.test("parses response body as text by default", async function(t) {
      let hook = renderHook(() => useFetchingState());
      let [state] = await startRequest(hook, { response: { body: 'hello' } });

      t.equal(state.parsedBody, 'hello');
    });

    t.test("uses {bodyParser}", async function(t) {
      let hook = renderHook(() => useFetchingState());
      let [state] = await startRequest(hook, { 
        response: { body: JSON.stringify({a: 1}) },
        bodyParser: r => r.json()
      });

      t.same(state.parsedBody, {a: 1});
    });

    t.test("handles non-200 responses as errors", async function(t) {
      let hook = renderHook(() => useFetchingState());
      let [state] = await startRequest(hook, { response: { status: 404 } });

      t.equal(state.response.status, 404);
      t.equal(state.success, false);
      t.equal(state.isLoading, false);
      t.match(state.error.message, /404/);
      t.equal(state.parsedBody, '');
    });

    t.test("handles promise rejections as errors", async function(t) {
      let hook = renderHook(() => useFetchingState());
      let error = new Error('foobar');
      actions(hook).startRequest(Promise.reject(error));

      await fetch.nextTick();
      let [state] = current(hook);

      t.equal(state.response, null);
      t.equal(state.success, false);
      t.equal(state.isLoading, false);
      t.equal(state.parsedBody, null);
      t.equal(state.error, error);
    });

    t.test("actions object stays the same between changes", async function(t) {
      let hook = renderHook(() => useFetchingState());
      let oldActions = actions(hook);
      await startRequest(hook);

      t.equal(actions(hook), oldActions);
    });

    t.test("does not display warnings if hook was unmounted during fetch", async function() {
      let hook = renderHook(() => useFetchingState());
      await cleanup();
      await startRequest(hook);
    });
  });
});
