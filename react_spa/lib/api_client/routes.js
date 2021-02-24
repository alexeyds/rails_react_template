import { composeRoutes } from "broutes";

export default composeRoutes(r => {
  r.scope('/api', r => {
    r.scope('/v1', r => {
      r.route('/hello_world');

      r.namedScope('/sessions', r => {
        r.route('/', { name: 'index' });
        r.route('/password');
      });
    });
  });
});
