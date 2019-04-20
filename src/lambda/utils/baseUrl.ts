export const reactGetBaseUrl = () => (
  process.env.REACT_APP_CONTEXT === 'deploy-preview' ? process.env.REACT_APP_DEPLOY_URL : process.env.REACT_APP_URL
);

