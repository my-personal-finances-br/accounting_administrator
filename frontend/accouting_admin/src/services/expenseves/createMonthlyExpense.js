import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const createMonthlyExpense = (data) => {
  const response = axios
    .post(
      `${backEndUrl}/api/internal/monthly_expense`,
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
