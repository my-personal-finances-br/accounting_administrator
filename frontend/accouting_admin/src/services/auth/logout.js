import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import cleanCookies from "../../utils/cleanCookies";

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
