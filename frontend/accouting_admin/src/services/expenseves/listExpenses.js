import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const listExpenses = (data) => {
  const response = axios
    .get(`http://ec2-100-24-4-42.compute-1.amazonaws.com:8000/api/internal/monthly_expense`, {
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
