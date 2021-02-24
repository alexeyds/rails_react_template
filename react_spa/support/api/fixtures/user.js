import { fakes, factory } from "support/api/factory";

export let user = factory({
  id: fakes.uniqueId,
  email: fakes.internet.email
});
