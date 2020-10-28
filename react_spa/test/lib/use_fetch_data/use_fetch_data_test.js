import test from "test/browser_tape";
import { renderHook, current, cleanup } from "test/support/hooks_renderer";
import useFetchData from "use_fetch_data";

test("useFetchData", function(t) {
  function actions(hook) {
    let [, actions] = current(hook);
    return actions;
  }

  t.test("basicUsage", function(t) {
    t.test("has loading state initially", async function(t) {
      let hook = renderHook(() => useFetchData());

      let [data] = current(hook);

      t.equal(data.response, null);
      t.equal(data.success, false);
      t.equal(data.isLoading, true);
      t.equal(data.error, null);
      t.equal(data.parsedBody, null);
    });

    t.test("has actions", function(t) {
      let hook = renderHook(() => useFetchData());

      t.notEqual(actions(hook).handleRequestPromise, undefined);
    });
  });

  t.test("actions.handleRequestPromise()", function(t) {
    async function handleRequestPromise(hook, { response=undefined, bodyParser=undefined }={}) {
      fetch.mock('/test-hook', { response });
      actions(hook).handleRequestPromise(fetch('/test-hook'), { bodyParser });

      await fetch.nextTick();
      return current(hook);
    }

    t.test("sets state to loaded", async function(t) {
      let hook = renderHook(() => useFetchData());
      let [data] = await handleRequestPromise(hook);

      t.equal(data.response.status, 200);
      t.equal(data.success, true);
      t.equal(data.isLoading, false);
      t.equal(data.error, null);
    });

    t.test("parses response body as text by default", async function(t) {
      let hook = renderHook(() => useFetchData());
      let [data] = await handleRequestPromise(hook, { response: { body: 'hello' } });

      t.equal(data.parsedBody, 'hello');
    });

    t.test("uses {bodyParser}", async function(t) {
      let hook = renderHook(() => useFetchData());
      let [data] = await handleRequestPromise(hook, { 
        response: { body: JSON.stringify({a: 1}) },
        bodyParser: r => r.json()
      });

      t.same(data.parsedBody, {a: 1});
    });

    t.test("handles non-200 responses as errors", async function(t) {
      let hook = renderHook(() => useFetchData());
      let [data] = await handleRequestPromise(hook, { response: { status: 404 } });

      t.equal(data.response.status, 404);
      t.equal(data.success, false);
      t.equal(data.isLoading, false);
      t.match(data.error.message, /404/);
      t.equal(data.parsedBody, '');
    });

    t.test("handles promise rejections as errors", async function(t) {
      let hook = renderHook(() => useFetchData());
      let error = new Error('foobar');
      actions(hook).handleRequestPromise(Promise.reject(error));

      await fetch.nextTick();
      let [data] = current(hook);

      t.equal(data.response, null);
      t.equal(data.success, false);
      t.equal(data.isLoading, false);
      t.equal(data.parsedBody, null);
      t.equal(data.error, error);
    });

    t.test("actions object stays the same between changes", async function(t) {
      let hook = renderHook(() => useFetchData());
      let oldActions = actions(hook);
      await handleRequestPromise(hook);

      t.equal(actions(hook), oldActions);
    });

    t.test("does not display warnings if hook was unmounted during fetch", async function() {
      let hook = renderHook(() => useFetchData());
      await cleanup();
      await handleRequestPromise(hook);
    });
  });
});
