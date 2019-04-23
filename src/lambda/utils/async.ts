export const to = (promise: Promise<any>) => {
  return promise
    .then((result: any) => {
      return [null, result];
    })
    .catch((err: any) => {
      return [err];
    })
}
