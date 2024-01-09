import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const createExpectedSalary = (data) => {
  const response = axios
    .post(`http://ec2-100-24-4-42.compute-1.amazonaws.com:8000/api/internal/expected_salaries`, data, {
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
