import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const listCreditCards = () => {
  const response = axios
    .get(`http://localhost:8000/api/internal/credit_cards`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
    })
    .then((resp) => resp)
    .catch((error) => error);

  return response;
};

export { listCreditCards };
