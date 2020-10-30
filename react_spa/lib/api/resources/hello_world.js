import { fetchJSON } from 'api/api_client/request';
import apiRoutes from 'api/routes';

export default {
  getApiVersion: () => fetchJSON(apiRoutes.helloWorldPath())
};
