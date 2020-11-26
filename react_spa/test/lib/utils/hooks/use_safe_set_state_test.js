import jutest from "test/browser_jutest";
import { renderHook, current, cleanup } from "test/support/hooks_renderer";
import useSafeSetState from "utils/hooks/use_safe_set_state";

jutest("useSafeSetState", s => {
  s.test("returns initial state", t => {
    let hook = renderHook(() => useSafeSetState('foo'));
    let [state] = current(hook);

    t.equal(state, 'foo');
  });

  s.test("returns setState function", t => {
    let hook = renderHook(() => useSafeSetState('foo'));
    let [, setState] = current(hook);
    setState('bar');
    let [state] = current(hook);

    t.equal(state, 'bar');
  });

  s.test("ignores state changes after being unmounted", async () => {
    let hook = renderHook(() => useSafeSetState());
    let [, setState] = current(hook);
    await cleanup();
    setState('foobar');
  });

  s.test("returns same setState function each time", t => {
    let hook = renderHook(() => useSafeSetState());
    let [, oldSetState] = current(hook);
    oldSetState('bar');
    let [, newSetState] = current(hook);

    t.equal(oldSetState, newSetState);
  });
});