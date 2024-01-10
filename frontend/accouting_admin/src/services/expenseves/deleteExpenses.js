import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const deleteExpenses = (id) => {
  const response = axios
    .delete(`${backEndUrl}/api/internal/expenses/${id}`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { deleteExpenses };
