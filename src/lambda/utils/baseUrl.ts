export const getBaseUrl = () => (
  process.env.DEPLOY_URL || process.env.BASE_URL || ''
);
