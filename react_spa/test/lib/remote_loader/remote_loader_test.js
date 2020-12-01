import jutest from "jutest";
import { RemoteLoader } from "remote_loader";

jutest("RemoteLoader", s => {
  s.describe(".initial", s => {
    s.test("returns loader in initial state", t => {
      let loader = RemoteLoader.initial();

      t.equal(loader.response, null);
      t.equal(loader.state, RemoteLoader.STATES.initial);
    });
  });

  s.describe(".loading", s => {
    s.test("returns loader in loading state", t => {
      let loader = RemoteLoader.loading();

      t.equal(loader.response, null);
      t.equal(loader.state, RemoteLoader.STATES.loading);
    });
  });

  s.describe(".loaded", s => {
    s.test("returns loader in loaded state", t => {
      let loader = RemoteLoader.loaded('foobar');

      t.equal(loader.response, 'foobar');
      t.equal(loader.state, RemoteLoader.STATES.loaded);
    });
  });

  s.describe("#isLoading", s => {
    s.test("true if remote is loading", t => {
      t.equal(RemoteLoader.loading().isLoading, true);
    });

    s.test("false if remote is not loading", t => {
      t.equal(RemoteLoader.initial().isLoading, false);
    });
  });

  s.describe("#isLoaded", s => {
    s.test("true if remote is loaded", t => {
      t.equal(RemoteLoader.loaded().isLoaded, true);
    });

    s.test("false if remote is not loaded", t => {
      t.equal(RemoteLoader.loading().isLoaded, false);
    });
  });
});
