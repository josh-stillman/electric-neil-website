export const baseUrl = () => (
  process.env.DEPLOY_URL || process.env.URL || ''
);
