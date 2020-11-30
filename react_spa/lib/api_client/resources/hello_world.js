import apiClient, { routes } from 'api_client';

export default {
  getApiVersion: () => apiClient.get(routes.helloWorldPath())
};
