import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const createExpenses = (data) => {
  const response = axios
    .post(`http://localhost:8000/api/internal/expenses`, data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { createExpenses };
