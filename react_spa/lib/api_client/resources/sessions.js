import apiClient, { routes } from 'api_client';

export default {
  destroy: () => apiClient.delete(routes.sessionsPath()),
  create: body => apiClient.post(routes.sessionsPath(), { body })
};
