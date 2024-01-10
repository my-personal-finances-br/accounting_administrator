import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const createExpectedSalary = (data) => {
  const response = axios
    .post(`${backEndUrl}/api/internal/expected_salaries`, data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { createExpectedSalary };
