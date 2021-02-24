import jutest from "test/browser_jutest";
import { setClearableTimeout } from "utils/timers";

jutest("utils/timers", s => {
  s.describe("setClearableTimeout()", s => {
    s.test("behaves like setTimeout", async t => {
      let result;
      setClearableTimeout(() => result = 'done', 0);
      await global.nextTick();

      t.equal(result, 'done');
    });

    s.test("returns cleanup function", async t => {
      let result;
      let cleanup = setClearableTimeout(() => result = 'done', 0);
      cleanup();
      await global.nextTick();

      t.equal(result, undefined);
    });
  });
});
