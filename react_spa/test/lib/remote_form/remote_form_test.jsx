import jutest from "test/browser_jutest";
import React from "react";
import { render } from "support/react_renderer";
import { renderHook, current } from "support/hooks_renderer";
import Remote from "remote/remote";
import { fetchAPIResponse, flowError } from "support/fetch";
import { useClosestRemote } from "remote/closest_remote";
import { RemoteForm, Input } from "remote_form";

jutest("RemoteForm", s => {
  let remote = Remote.initialize();

  s.test("behaves like regular Form", t => {
    let container = render(
      <RemoteForm remote={remote} name='user' defaultValues={{ name: 'John' }}>
        <Input name='name'/>
      </RemoteForm>
    );

    let input = container.getByTag('input');
    t.equal(input.name, 'user[name]');
    t.equal(input.value, 'John');
  });

  s.test("provides ClosesRemote context", t => {
    let wrapper = (props) => <RemoteForm remote={remote} {...props}/>;
    let hook = renderHook(() => useClosestRemote(), { wrapper });

    t.equal(current(hook), remote);
  });

  s.test("renders remote error message", async t => {
    let response = await fetchAPIResponse(flowError({ message: 'test error' }));
    let container = render(<RemoteForm remote={remote.loaded(response)}/>);

    t.assert(container.queryByText('test error'));
  });
});
