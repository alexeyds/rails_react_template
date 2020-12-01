import jutest from "test/browser_jutest";
import { renderHook, current } from "test/support/hooks_renderer";
import { useRemoteLoader } from "remote_loader";

jutest("useRemoteLoader()", s => {
  function loaderHook(fetchRemote) {
    return renderHook(() => useRemoteLoader(fetchRemote));
  }

  s.test("has initial state", t => {
    let [remote, loadRemote] = current(loaderHook(async () => {}));

    t.equal(remote.isLoading, false);
    t.equal(typeof loadRemote, 'function');
  });

  s.test("has loading state", t => {
    let hook = loaderHook(async () => {});

    let [, loadRemote] = current(hook);
    loadRemote();
    let [remote] = current(hook);

    t.equal(remote.isLoading, true);
  });

  s.test("has loaded state", async t => {
    let hook = loaderHook(async () => 'foobar');

    let [, loadRemote] = current(hook);
    await loadRemote();
    let [remote] = current(hook);

    t.equal(remote.isLoaded, true);
    t.equal(remote.response, 'foobar');
  });

  s.test("passes arguments to remote fetcher", async t => {
    let args;
    let hook = loaderHook(async function() { args = [...arguments]; });

    let [, loadRemote] = current(hook);
    await loadRemote('arg1', 'arg2');

    t.same(args, ['arg1', 'arg2']);
  });

  s.test("preserves loadRemote function identity", async t => {
    let hook = loaderHook(async () => {});

    let [, oldLoadRemote] = current(hook);
    await oldLoadRemote();
    let [, newLoadRemote] = current(hook);

    t.equal(oldLoadRemote, newLoadRemote);
  });
});
