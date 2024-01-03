import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const createSalary = (data) => {
  const response = axios
    .post(`http://localhost:8000/api/internal/salaries`, data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { createSalary };
