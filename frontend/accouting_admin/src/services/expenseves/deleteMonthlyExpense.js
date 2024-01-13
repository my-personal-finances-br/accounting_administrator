import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const deleteMonthlyExpense = (id) => {
  const response = axios
    .delete(`${backEndUrl}/api/internal/monthly_expense/${id}/detail`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { deleteMonthlyExpense };
