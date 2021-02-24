import jutest from "test/browser_jutest";
import { fetchResponse } from "support/fetch";
import { currentSession, signIn } from "support/session";
import { renderHook, getState, getActions } from "support/hooks_renderer";
import useAPIRemote from "remote/use_api_remote";

jutest("useAPIRemote()", s => {
  let doRequest = (hook, ...args) => {
    getActions(hook)(...args);
    return global.nextTick();
  };

  s.setup(() => {
    let hook = renderHook(() => useAPIRemote(fetchResponse));
    return { hook };
  });

  s.test("behaves like useRemote", async (t, { hook }) => {
    t.equal(getState(hook).isInitial, true);
    await doRequest(hook);

    t.equal(getState(hook).isSuccess, true);
  });

  s.test("signs user out if remote returned 401 status", async (t, { hook }) => {
    signIn();
    await doRequest(hook, { status: 401 });

    t.equal(currentSession(), null);
  });

  s.test("does not sign user out if remote returned non-401", async (t, { hook }) => {
    signIn();
    await doRequest(hook, { status: 403 });

    t.assert(currentSession());
  });
});
