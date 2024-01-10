import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const MonthlyExpenseClosure = (id) => {
  const response = axios
    .put(
      `${backEndUrl}/api/internal/monthly_expense/${id}/closure`,
      {},
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCookieValue("csrftoken"),
        },
      },
    )
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { MonthlyExpenseClosure };
