import test from "enhanced-tape";
import config from "config";

test("config", function(t) {
  t.test("env", function(t) {
    t.test("has is* attributes for checking current env", function(t) {
      t.equal(config.env.isTest, true);
      t.equal(config.env.isProduction, false);
      t.equal(config.env.isDevelopment, false);
      t.equal(config.env.isBrowser, false);
    });
  });
});
