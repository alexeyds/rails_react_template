// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
import { JSDOM } from 'jsdom';
import { buildFetch } from 'fetcherino';

let jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.com' });
let { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

let fetch = buildFetch();
window.fetch = fetch;

window.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
window.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);
