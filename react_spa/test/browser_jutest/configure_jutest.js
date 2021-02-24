import jutest from "jutest";
import nextTick from "support/next_tick";
import { signOut } from "support/session";
import { cleanup as unmountRenderedHooks } from 'support/hooks_renderer';
import { cleanup as unmountRenderedComponents } from "support/react_renderer";

global.nextTick = nextTick;

jutest.teardown(async () => {
  localStorage.clear();
  sessionStorage.clear();
  signOut();
  await unmountRenderedComponents();
  await unmountRenderedHooks();
});

jutest.beforeTestEnd(() => {
  fetch.validateAndResetMocks();
});
