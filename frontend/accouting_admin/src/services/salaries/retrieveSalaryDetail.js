import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
import { backEndUrl } from "../../utils/URL/baseUrl";

const retrieveSalaryDetail = (id) => {
  const response = axios
    .get(`${backEndUrl}/api/internal/salaries/${id}`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { retrieveSalaryDetail };
