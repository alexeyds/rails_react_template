import apiClient from 'api/api_client';
import apiRoutes from 'api/routes';

export default {
  destroy: () => apiClient.delete(apiRoutes.sessionsPath())
};
