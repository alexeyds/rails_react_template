import jutest from "test/browser_jutest";
import { fixtures } from "remote_expectations";
import { Response } from "remote/response";

jutest("Response", s => {
  function fetchResponse(response) {
    fetch.mock('/test', { response });
    return fetch('/test');
  }

  function flowError() {
    return JSON.stringify(fixtures.errors.flowError(...arguments));
  }

  s.describe("constructor", s => {
    s.test("accepts {state} property", t => {
      let response = new Response({state: 'foobar'});

      t.equal(response.state, 'foobar');
      t.equal(response.body, null);
      t.equal(response.rawResponse, null);
      t.equal(response.rejection, null);
    });

    s.test("converts body object to camelcase", t => {
      let response = new Response({body: { foo_bar: 'baz' }});

      t.same(response.body, { fooBar: 'baz' });
    });
  });

  s.describe(".initial()", s => {
    s.test("returns response in initial state", t => {
      let response = Response.initial();
      t.equal(response.state, Response.STATES.initial);
    });
  });

  s.describe(".loading()", s => {
    s.test("returns response in loading state", t => {
      let response = Response.loading();
      t.equal(response.state, Response.STATES.loading);
    });
  });

  s.describe(".rejected()", s => {
    s.test("returns rejected state", t => {
      let response = Response.rejected('foobar');

      t.equal(response.state, Response.STATES.rejected);
      t.equal(response.rejection, 'foobar');
    });
  });

  s.describe(".fromFetchResponse()", s => {
    s.test("resolves into success state", async t => {
      let response = await Response.fromFetchResponse(await fetchResponse({ body: 'foobar' }));

      t.equal(response.state, Response.STATES.success);
      t.equal(response.body, 'foobar');
      t.equal(response.rawResponse.status, 200);
    });


    s.test("resolves into failed state", async t => {
      let response = await Response.fromFetchResponse(await fetchResponse({ body: 'foobar', status: 404 }));

      t.equal(response.state, Response.STATES.failed);
      t.equal(response.body, 'foobar');
      t.equal(response.rawResponse.status, 404);
    });

    s.test("parses json body", async t => {
      let body = JSON.stringify({foo: 'bar'});
      let response = await Response.fromFetchResponse(await fetchResponse({ body }));

      t.same(response.body, { foo: 'bar' });
    });
  });

  s.describe("#isLoading", s => {
    s.test("true if response is loading", t => {
      t.equal(Response.loading().isLoading, true);
    });

    s.test("false if response is not loading", t => {
      t.equal(Response.initial().isLoading, false);
    });
  });

  s.describe("#isSuccess", s => {
    s.test("true if response is success", async t => {
      let response = await fetchResponse().then(Response.fromFetchResponse);
      t.equal(response.isSuccess, true);
    });

    s.test("false if response is not success", t => {
      t.equal(Response.loading().isSuccess, false);
    });
  });

  s.describe("#isErrored", s => {
    s.test("true if response is rejected", t => {
      let response = Response.rejected('foobar');
      t.equal(response.isErrored, true);
    });

    s.test("true if response is failed", async t => {
      let response = await fetchResponse({ status: 404 }).then(Response.fromFetchResponse);
      t.equal(response.isErrored, true);
    });

    s.test("false if response neither rejected nor failed", t => {
      t.equal(Response.loading().isErrored, false);
    });
  });

  s.describe("#errorMessage", s => {
    s.test("returns null if response has no errors", t => {
      t.equal(Response.loading().errorMessage, null);
    });

    s.test("returns server error message", async t => {
      let body = flowError({message: 'foobarerror'});
      let response = await fetchResponse({ body, status: 422 }).then(Response.fromFetchResponse);
      t.equal(response.errorMessage, 'foobarerror');
    });

    s.test("returns default message if server error message is missing", async t => {
      let response = await fetchResponse({ status: 404 }).then(Response.fromFetchResponse);
      t.match(response.errorMessage, /404/);
    });

    s.test("returns rejection message if response is rejected", t => {
      let response = Response.rejected(new Error('errorbar'));
      t.match(response.errorMessage, /errorbar/);
    });
  });

  s.describe("#errorDetails", s => {
    s.test("returns server error details", async t => {
      let body = flowError({details: { foo: 'bar' }});
      let response = await fetchResponse({ body, status: 422 }).then(Response.fromFetchResponse);
      t.same(response.errorDetails, { foo: 'bar' });
    });

    s.test("returns empty object if response is not failed", async t => {
      let body = flowError({details: { foo: 'bar' }});
      let response = await fetchResponse({ body, status: 200 }).then(Response.fromFetchResponse);
      t.same(response.errorDetails, {});
    });

    s.test("returns empty object if response has no server error", async t => {
      let response = await fetchResponse({ status: 404 }).then(Response.fromFetchResponse);
      t.same(response.errorDetails, {});
    });
  });
});
