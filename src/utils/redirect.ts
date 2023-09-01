export const redirect = async (router: any, address = "/") => {
  await router.push(address);
};