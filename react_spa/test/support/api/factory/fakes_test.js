import jutest from "jutest";
import { fakes } from "support/api/factory";

jutest("fakes", s => {
  s.test("has faker methods", t => {
    t.assert(fakes.company.companyName());
  });

  s.describe(".uniqueId()", s => {
    s.test("returns id", t => {
      t.equal(typeof fakes.uniqueId(), 'number');
    });
  });
});
