import Request from 'api/request';
import apiRoutes from 'api/routes';

export default {
  getApiVersion: () => Request.get(apiRoutes.helloWorldPath())
};
