export const getDbName = () => (
  process.env.ENV === 'dev' ? 'DEV' : 'services'
);
