import { composeRoutes } from "broutes";

export default composeRoutes(r => {
  r.scope('/api', r => {
    r.scope('/:version', r => {
      r.route('/hello_world');
      r.resources("sessions", { only: ['show'], singleton: true });
    }, { defaultParams: { version: 'v1' } });
  });
});
