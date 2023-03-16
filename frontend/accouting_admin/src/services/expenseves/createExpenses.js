import axios from "axios"

const getCookieValue = (name) => {
    const cookieString = document.cookie;
    const parsedCookie = cookieString.split(';').reduce((res, c) => {
      const [key, val] = c.trim().split('=').map(decodeURIComponent);
      try {
        return Object.assign(res, { [key]: JSON.parse(val) });
      } catch (e) {
        return Object.assign(res, { [key]: val });
      }
    }, {});
    console.log(parsedCookie[`${name}`])
    return parsedCookie[`${name}`];
  };

  const createExpenses = (data) => {
    const response = axios.post(
        `http://localhost:8000/api/internal/expenses/create`,
        data,
        {
            withCredentials: true,
            headers: {
                'X-CSRFToken': getCookieValue('csrftoken')
              }
        }
    )
    .then((resp) => resp)
    .catch((error) => error)

    return response
}

export {createExpenses}