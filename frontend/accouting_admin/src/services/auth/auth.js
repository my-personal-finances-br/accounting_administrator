import axios from "axios";
import { backEndUrl } from "../../utils/URL/baseUrl";

const auth = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${backEndUrl}/api/internal/authenticate/generics`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    const cookies = response.headers["set-cookie"];

    if (cookies) {
      cookies.forEach((cookie) => {
        document.cookie = cookie;
      });
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { auth };
