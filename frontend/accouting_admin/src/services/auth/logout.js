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
    return parsedCookie[`${name}`];
  };
  function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}



const logout = (data) => {
  const response = axios.post(
      `http://localhost:8000/api/internal/me/logout`,
      {},
      {
          withCredentials: false,
          headers: {
              'X-CSRFToken': getCookieValue('csrftoken')
            }
      }
  )
  .then((resp) => resp)
  .catch((error) => error)
  eraseCookie('csrftoken')
  eraseCookie('sessionid')
  return response
}

export {logout}