import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const createMonthlyExpense = (data) => {
  const response = axios
    .post(
      `http://localhost:8000/api/internal/monthly_expense`,
      { month: "default", month_number: 0 },
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

export { createMonthlyExpense };
