import jutest from "test/browser_jutest";
import { fetchResponse } from "support/fetch";
import ParsedResponse from "api_client/connection/parsed_response";

jutest("ParsedResponse", s => {
  let fetchParsed = (opts) => fetchResponse(opts).then(rawResponse => new ParsedResponse({ rawResponse }));

  s.describe("constructor", s => {
    s.test("parses raw response details", async t => {
      let rawResponse = await fetchResponse({ status: 201 });
      let response = new ParsedResponse({ rawResponse, body: 'test' });

      t.equal(response.body, 'test');
      t.equal(response.ok, true);
      t.equal(response.status, 201);
      t.equal(response.error, null);
      t.assert(response.headers);
    });
  });


  s.describe("#contentTypeMatches", s => {
    s.test("returns false if response has no content type", async t => {
      let response = await fetchParsed();
      t.equal(response.contentTypeMatches(/text/), false);
    });

    s.test("returns true if content type matches", async t => {
      let response = await fetchParsed({ headers: { 'Content-Type': 'application/json' } });
      t.equal(response.contentTypeMatches(/json/), true);
    });

    s.test("returns false if content type doesn't match", async t => {
      let response = await fetchParsed({ headers: { 'Content-Type': 'text/html' } });
      t.equal(response.contentTypeMatches(/json/), false);
    });
  });
});
