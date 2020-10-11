import { configure } from "test/support/react_renderer";

export * from '@testing-library/react';

configure({testIdAttribute: 'test-id'});
