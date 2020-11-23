import { composeRoutes } from "broutes";

export default composeRoutes(r => {
  r.route('/', { name: 'root' });
  r.route('/hello_world');
  r.route('/login');
});
