import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const MonthlyExpenseClojure = () => {
  const response = axios
    .post(
      `http://localhost:8000/api/internal/monthly_expense/closure`,
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

export { MonthlyExpenseClojure };
