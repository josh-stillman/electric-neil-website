// Neflitfy contexts: production, deploy-preview, branch-deploy

export const getDbName = () => (
  process.env.CONTEXT === 'production' ? 'services' : 'DEV'
);
