import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const deleteExpectedSalary = (id) => {
  const response = axios
    .delete(`http://accounting_administrator-django-1:8000/api/internal/expected_salaries/${id}`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { deleteExpectedSalary };
