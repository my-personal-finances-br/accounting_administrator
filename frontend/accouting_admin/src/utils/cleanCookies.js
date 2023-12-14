const cleanCookies = () => {
  document.cookie = "sessionid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "csrftoken= ;expires = Thu, 01 Jan 1970 00:00:00 GMT";
};

export default cleanCookies;
