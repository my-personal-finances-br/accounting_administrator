import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const MonthlyExpenseClosure = (id) => {
  const response = axios
    .put(
      `http://localhost:8000/api/internal/monthly_expense/${id}/closure`,
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
