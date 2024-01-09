import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const deleteSalary = (id) => {
  const response = axios
    .delete(`http://accounting_administrator-django-1:8000/api/internal/salaries/${id}`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { deleteSalary };
