import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const editSalary = (data, id) => {
  const response = axios
    .patch(`${backEndUrl}/api/internal/salaries/${id}`, data, {
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
