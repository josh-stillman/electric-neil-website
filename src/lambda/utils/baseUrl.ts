export const getBaseUrl = () => {
  switch (process.env.CONTEXT) {
    case 'production':
      return process.env.URL || '';
    case 'deploy-preview':
    case 'branch-deploy':
      return process.env.DEPLOY_URL || process.env.URL || process.env.BASE_URL || '';
    default:
      return process.env.BASE_URL || '';
  }
}
