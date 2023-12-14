import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const expectedExpenseList = () => {
  const response = axios
    .get(`http://localhost:8000/api/internal/expected_expenses`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { expectedExpenseList };
