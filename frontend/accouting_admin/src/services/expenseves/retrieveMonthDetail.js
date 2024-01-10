import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const retrieveMonthDetail = (id) => {
  const response = axios
    .get(`${backEndUrl}/api/internal/monthly_expense/${id}/detail`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { retrieveMonthDetail };
