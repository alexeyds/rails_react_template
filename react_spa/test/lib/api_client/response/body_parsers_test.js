import jutest from "test/browser_jutest";
import { parseJSON } from "api_client/response/body_parsers";

jutest("response/body_parsers", s => {
  function buildResponse({body}) {
    return { text: () => Promise.resolve(body) };
  }

  s.describe("parseJSON()", s => {
    s.test("returns body string if it cannot be parsed to json", async t => {
      let result = await parseJSON(buildResponse({body: 'test'}));
      t.equal(result, 'test');
    });

    s.test("returns parsed body", async t => {
      let result = await parseJSON(buildResponse({body: JSON.stringify({a: 1})}));
      t.same(result, {a: 1});
    });

    s.test("camelizes response keys", async t => {
      let result = await parseJSON(buildResponse({body: JSON.stringify({foo_bar: 1})}));
      t.same(result, {fooBar: 1});
    });
  });
});
