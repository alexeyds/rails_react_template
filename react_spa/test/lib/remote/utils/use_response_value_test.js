import jutest from "test/browser_jutest";
import request from "remote/request";
import { useState } from "react";
import { renderHook, current } from "test/support/hooks_renderer";
import { Remote } from "remote";
import { useResponseValue } from "remote/utils";

jutest("useResponseValue()", s => {
  function buildHook() {
    return renderHook(() => useResponseValue(...arguments));
  }

  function fetchResponse(response) {
    fetch.mock('/use-response-value-test', { response });
    return request('/use-response-value-test');
  }

  s.test("returns {initial} value if remote is not loaded", t => {
    let remote = Remote.loading();
    let hook = buildHook(remote, { initial: [], extract: () => {} });

    t.same(current(hook), []);
  });

  s.test("passes response to {extract} function and returns result", async t => {
    let remote = await fetchResponse({body: 'foobar'}).then(Remote.loaded);
    let hook = buildHook(remote, { initial: 'baz', extract: (r) => r.body });

    t.equal(current(hook), 'foobar');
  });

  s.test("preserves previous value if remote changes state", async t => {
    let setRemote;
    let remote = await fetchResponse({body: 'foobar'}).then(Remote.loaded);

    let hook = renderHook(() => {
      let remoteState = useState(remote);
      setRemote = remoteState[1];
      return useResponseValue(remoteState[0], { extract: r => r.body });
    });

    t.equal(current(hook), 'foobar');
    setRemote(Remote.loading());
    t.equal(current(hook), 'foobar');
  });
});
