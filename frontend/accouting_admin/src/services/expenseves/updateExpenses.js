import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const updateExpenses = (data, id) => {
  const response = axios
    .patch(`http://localhost:8000/api/internal/expenses/${id}`, data, {
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
