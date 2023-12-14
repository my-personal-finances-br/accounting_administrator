import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const cleanCookies = () => {
  document.cookie = "sessionid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "csrftoken= ;expires = Thu, 01 Jan 1970 00:00:00 GMT";
};

const logout = (data) => {
  const response = axios
    .post(
      `http://localhost:8000/api/internal/me/logout`,
      {},
      {
        withCredentials: false,
        headers: {
          "X-CSRFToken": getCookieValue("csrftoken"),
        },
      },
    )
    .then((resp) => resp)
    .catch((error) => error);
  cleanCookies();
  return response;
};

export { logout };
