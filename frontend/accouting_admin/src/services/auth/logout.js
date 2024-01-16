import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import cleanCookies from "../../utils/cleanCookies";
import { backEndUrl } from "../../utils/URL/baseUrl";

const logout = () => {
  localStorage.removeItem("me");
  const response = axios
    .post(
      `${backEndUrl}/api/internal/me/logout`,
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
