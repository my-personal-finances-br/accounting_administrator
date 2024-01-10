import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const updateExpenses = (data, id) => {
  const response = axios
    .patch(`${backEndUrl}/api/internal/expenses/${id}`, data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { updateExpenses };
