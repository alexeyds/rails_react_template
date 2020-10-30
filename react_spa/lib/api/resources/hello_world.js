import apiClient from 'api/api_client';
import apiRoutes from 'api/routes';

export default {
  getApiVersion: () => apiClient.get(apiRoutes.helloWorldPath())
};
