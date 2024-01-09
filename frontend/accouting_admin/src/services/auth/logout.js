import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import cleanCookies from "../../utils/cleanCookies";

const logout = (data) => {
  const response = axios
    .post(
      `http://ec2-100-24-4-42.compute-1.amazonaws.com:8000/api/internal/me/logout`,
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
