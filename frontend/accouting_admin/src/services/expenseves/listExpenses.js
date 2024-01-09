import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const listExpenses = (data) => {
  const response = axios
    .get(`http://accounting_administrator-django-1:8000/api/internal/monthly_expense`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { listExpenses };
