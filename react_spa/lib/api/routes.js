import { composeRoutes } from "broutes";

export default composeRoutes(r => {
  r.scope('/api', r => {
    r.scope('/:version', r => {
      r.route('/hello_world');
    }, { defaultParams: { version: 'v1' } });
  });
});
