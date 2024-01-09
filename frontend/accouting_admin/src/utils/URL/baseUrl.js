const { hostname } = window.location;

export const returnCurrentBaseUrl = () => {
  const urls = [{ localhost: "accounting_administrator-django-1:8000" }];
  return urls[0][hostname];
};
