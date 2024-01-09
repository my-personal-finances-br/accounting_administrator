import axios from "axios";

const auth = async ({ username, password }) => {
  try {
    const response = await axios.post(
      "http://ec2-100-24-4-42.compute-1.amazonaws.com:8000/api/internal/authenticate/generics",
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
