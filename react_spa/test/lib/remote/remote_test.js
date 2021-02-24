import jutest from "test/browser_jutest";
import { fetchResponse } from "support/fetch";
import Remote from "remote/remote";

let { STATES } = Remote;

jutest("Remote", s => {
  s.describe(".initialize()", s => {
    s.test("creates remote", t => {
      let remote = Remote.initialize();

      t.equal(remote.response, null);
      t.equal(remote.rejection, null);
      t.equal(remote.lastOkResponse, null);
      t.equal(remote.state, STATES.initial);
    });
  });

  s.describe("utility", s => {
    s.test("has state check methods", t => {
      let remote = Remote.initialize();

      t.equal(remote.isInitial, true);
      t.equal(remote.isLoading, false);
      t.equal(remote.isSuccess, false);
      t.equal(remote.isFailure, false);
    });

    s.test("preserves lastOkResponse between all state changes", async t => {
      let response = await fetchResponse({ status: 200 });
      let remote = Remote
        .initialize()
        .loaded(response)
        .loading()
        .rejected(new Error('/test'))
        .loading()
        .loaded(await fetchResponse({ status: 500 }));

      t.equal(remote.lastOkResponse, response);
    });
  });

  s.describe("#loading()", s => {
    s.test("converts remote to loading state", t => {
      let initialRemote = Remote.initialize();
      let remote = initialRemote.loading();

      t.notEqual(initialRemote, remote);

      t.equal(remote.state, STATES.loading);
      t.equal(remote.isInitial, false);
      t.equal(remote.isLoading, true);
    });
  });

  s.describe("#rejected()", s => {
    s.test("converts remote to failure state", t => {
      let error = new Error('/test');
      let remote = Remote.initialize().rejected(error);

      t.equal(remote.state, STATES.failure);
      t.equal(remote.rejection, error);
      t.equal(remote.isFailure, true);
    });
  });

  s.describe("#loaded", s => {
    s.test("converts remote to success state if response is ok", async t => {
      let response = await fetchResponse({ status: 201 });
      let remote = Remote.initialize().loaded(response);

      t.equal(remote.state, STATES.success);
      t.equal(remote.response, response);
      t.equal(remote.lastOkResponse, response);
      t.equal(remote.isSuccess, true);
    });

    s.test("converts remotes to failure state if response is not ok", async t => {
      let response = await fetchResponse({ status: 404 });
      let remote = Remote.initialize().loaded(response);

      t.equal(remote.state, STATES.failure);
      t.equal(remote.response, response);
      t.equal(remote.lastOkResponse, null);
      t.equal(remote.isFailure, true);
    });
  });
});
