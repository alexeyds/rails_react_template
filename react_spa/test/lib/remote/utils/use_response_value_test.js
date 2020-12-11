import jutest from "test/browser_jutest";
import request from "remote/request";
import expect from "test/support/remote/expect";
import { useState } from "react";
import { renderHook, current } from "test/support/hooks_renderer";
import { Remote } from "remote";
import { useResponseValue } from "remote/utils";

jutest("useResponseValue()", s => {
  function buildHook() {
    return renderHook(() => useResponseValue(...arguments));
  }

  function fetchResponse(response) {
    expect('/use-response-value-test', { response });
    return request('/use-response-value-test');
  }

  s.test("returns {initial} value if remote is not loaded", t => {
    let remote = Remote.loading();
    let hook = buildHook(remote, { initial: [], key: 'items' });

    t.same(current(hook), []);
  });

  s.test("extracts {key} from response body", async t => {
    let remote = await fetchResponse({body: { items: [1, 2] }}).then(Remote.loaded);
    let hook = buildHook(remote, { initial: 'baz', key: 'items' });

    t.same(current(hook), [1, 2]);
  });

  s.test("can dig for nested values", async t => {
    let remote = await fetchResponse({body: { items: { main: 'foo' } }}).then(Remote.loaded);
    let hook = buildHook(remote, { initial: 'baz', key: 'items.main' });

    t.same(current(hook), 'foo');
  });

  s.test("preserves cached value between loads", async t => {
    let setRemote;
    let remote = await fetchResponse({body: { items: 'foobar' }}).then(Remote.loaded);

    let hook = renderHook(() => {
      let remoteState = useState(remote);
      setRemote = remoteState[1];
      return useResponseValue(remoteState[0], { key: 'items' });
    });

    t.equal(current(hook), 'foobar');
    setRemote(Remote.loading());
    t.equal(current(hook), 'foobar');
  });
});
