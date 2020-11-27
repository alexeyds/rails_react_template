import jutest from "test/browser_jutest";
import apiClient from "api/api_client";
import { fixtures as errorFixtures } from "api_expectations/errors";
import { extractResponseError } from "api/errors";

jutest("api errors", s => {
  function fetchResponse(response) {
    fetch.mock('/api-errors-test', { response });
    return apiClient.executeRequest('/api-errors-test');
  }

  s.describe("exractResponseError()", s => {
    s.test("returns null if response is successfull", async t => {
      let error = extractResponseError(await fetchResponse({ status: 200 }));
      t.equal(error, null);
    });

    s.test("extracts error message", async t => {
      let body = JSON.stringify(errorFixtures.flowError({message: 'foobartest'}));
      let error = extractResponseError(await fetchResponse({ status: 400, body }));

      t.equal(error, 'foobartest');
    });

    s.test("returns general error if error message cant be parsed", async t => {
      let error = extractResponseError(await fetchResponse({ status: 400, body: JSON.stringify({}) }));

      t.equal(typeof error, 'string');
      t.notEqual(error.length, 0);
    });
  });
});
