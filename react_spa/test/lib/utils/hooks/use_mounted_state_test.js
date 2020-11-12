import jutest from "jutest";
import { useState } from "react";
import { renderHook, current, cleanup } from "test/support/hooks_renderer";
import useMountedState from "utils/hooks/use_mounted_state";

jutest("useMountedState", function(t) {
  t.test("sets isMounted to true", function(t) {
    let hook = renderHook(() => useMountedState());

    t.equal(current(hook).isMounted(), true);
  });

  t.test("sets isMounted to false on unmount", async function(t) {
    let hook = renderHook(() => useMountedState());
    await cleanup();

    t.equal(current(hook).isMounted(), false);
  });

  t.test("preserves hook identity during re-renders", function(t) {
    let reRenderHook;

    let hook = renderHook(() => {
      let [, setState] = useState({});
      reRenderHook = () => setState({});

      return useMountedState();
    });

    let oldState = current(hook);
    reRenderHook();

    t.equal(current(hook), oldState);
  });
});
