import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const expectedSalaryList = () => {
  const response = axios
    .get(`http://accounting_administrator-django-1:8000/api/internal/expected_salaries`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { expectedSalaryList };
