export const getBaseUrl = () => (
  process.env.DEPLOY_PRIME_URL || process.env.URL || process.env.BASE_URL || ''
);
