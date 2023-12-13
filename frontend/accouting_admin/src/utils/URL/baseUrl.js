const { hostname } = window.location;

export const returnCurrentBaseUrl = () => {
  const urls = [{ localhost: "localhost:8000" }];
  return urls[0][hostname];
};
