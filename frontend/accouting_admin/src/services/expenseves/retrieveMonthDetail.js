import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const retrieveMonthDetail = (id) => {
  const response = axios
    .get(`http://localhost:8000/api/internal/monthly_expense/${id}/detail`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { retrieveMonthDetail };
