import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";

const listCreditCards = () => {
  const response = axios
    .get(`http://ec2-100-24-4-42.compute-1.amazonaws.com:8000/api/internal/credit_cards`, {
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
