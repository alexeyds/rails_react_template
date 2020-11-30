import jutest from "test/browser_jutest";
import { renderHook, current } from "test/support/hooks_renderer";
import { STATES } from "promise_loader/states";
import { usePromiseLoader } from "promise_loader";

jutest("usePromiseLoader()", s => {
  s.test("has inital state on creation", t => {
    let hook = renderHook(() => usePromiseLoader(() => {}));
    let [loader, loadPromise] = current(hook);

    t.equal(loader.state, STATES.initial);
    t.equal(loader.result, null);
    t.equal(loader.error, null);
    t.equal(typeof loadPromise, 'function');
  });

  s.describe("submit()", s => {
    function loadPromise(hook) {
      let [, execute] = current(hook);
      return execute(hook);
    }

    s.test("sets state to loading", t => {
      let hook = renderHook(() => usePromiseLoader(async () => {}));

      loadPromise(hook);
      let [loader] = current(hook);

      t.equal(loader.state, STATES.loading);
      t.equal(loader.result, null);
      t.equal(loader.error, null);
    });

    s.test("sets state to loaded", async t => {
      let hook = renderHook(() => usePromiseLoader(async () => 'my loader'));

      await loadPromise(hook);
      let [loader] = current(hook);

      t.equal(loader.state, STATES.loaded);
      t.equal(loader.result, 'my loader');
      t.equal(loader.error, null);
    });

    s.test("passes arguments to provided loader function", async t => {
      let args;
      let hook = renderHook(() => usePromiseLoader(async function() {
        args = [...arguments];
      }));

      let [, loadPromise] = current(hook);
      await loadPromise(1, 2);

      t.same(args, [1, 2]);
    });

    s.test("stays the same between renders", async t => {
      let loader = async () => {};
      let hook = renderHook(() => usePromiseLoader(loader));

      let [, oldSubmit] = current(hook);
      await loadPromise(hook);
      let [, newSubmit] = current(hook);

      t.equal(oldSubmit, newSubmit);
    });
  });
});
