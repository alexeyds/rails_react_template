import { composeRoutes } from "broutes";

export default composeRoutes(r => {
  r.route('/');
  r.route('/hello_world');
  r.route('/login');
});
