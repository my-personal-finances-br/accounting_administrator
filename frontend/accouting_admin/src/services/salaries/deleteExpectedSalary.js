import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const deleteExpectedSalary = (id) => {
  const response = axios
    .delete(`${backEndUrl}/api/internal/expected_salaries/${id}`, {
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
