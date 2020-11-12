// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
import { JSDOM } from 'jsdom';
import { buildFetch } from 'fetcherino';
import { nextTick } from 'test/support/event_loop';

let jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.com' });
let { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

let fetch = buildFetch();
global.fetch = fetch;
window.fetch = fetch;

global.nextTick = nextTick;
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};

copyProps(window, global);
