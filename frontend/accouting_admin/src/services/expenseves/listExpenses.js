import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";
import { logout } from "../auth/logout";

const listExpenses = (data) => {
  const response = axios
    .get(`${backEndUrl}/api/internal/monthly_expense`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => {
      if (resp.response?.status === 403) {
        logout();
      }
      return resp;
    })
    .catch((error) => {
      if (error.response?.status === 403) {
        logout();
      }
      return error;
    });

  return response;
};

export { listExpenses };
