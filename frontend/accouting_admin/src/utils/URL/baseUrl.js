const { hostname } = window.location;

export const returnCurrentBaseUrl = () => {
  const urls = [{ localhost: "ec2-100-24-4-42.compute-1.amazonaws.com:8000" }];
  return urls[0][hostname];
};
