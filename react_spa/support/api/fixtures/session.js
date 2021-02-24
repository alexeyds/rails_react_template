import { fakes, factory } from "support/api/factory";
import { user } from "./user";

export let session = factory({
  expires_at: () => fakes.date.future().toISOString(),
  user
});

session.show = factory({
  current_session: session
});
