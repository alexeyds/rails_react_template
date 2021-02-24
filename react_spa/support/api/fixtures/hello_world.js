import { fakes, factory } from "support/api/factory";

export let helloWorld = factory({
  api_version: 'v1',
  locale: 'en',
  details: 'hello',
  user_email: fakes.internet.email
});
