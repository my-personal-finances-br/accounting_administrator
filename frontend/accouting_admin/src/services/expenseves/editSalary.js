import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const editSalary = (data, id) => {
  const response = axios
    .patch(`http://accounting_administrator-django-1:8000/api/internal/salaries/${id}`, data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { editSalary };
