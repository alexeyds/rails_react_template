import { configure, queries, render as testingLibRender, getQueriesForElement } from "@testing-library/react";
import createQueries from "./create_queries";

export * from '@testing-library/react';

let customQueries = { 
  ...queries,
  ...createQueries({ name: 'tag', selector: (container, tag) => container.getElementsByTagName(tag) }),
  ...createQueries({ name: 'name', selector: (container, name) => container.querySelectorAll(`[name=${name}]`) })
};

export function render(ui, options) {
  return testingLibRender(ui, {queries: customQueries, ...options});
}

export function within(element) {
  return getQueriesForElement(element, customQueries);
}

configure({testIdAttribute: 'test-id'});
