import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const deleteExpenses = (id) => {
  const response = axios
    .delete(`http://localhost:8000/api/internal/expenses/${id}`, {
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
