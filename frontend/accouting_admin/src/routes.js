import { Routes as Switch, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import NotFound from "./pages/notFound";

const getCookieValue = (name) => {
  const cookieString = document.cookie;
  const parsedCookie = cookieString.split(";").reduce((res, c) => {
    const [key, val] = c.trim().split("=").map(decodeURIComponent);
    try {
      return Object.assign(res, { [key]: JSON.parse(val) });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
  return parsedCookie[`${name}`];
};

const isUserLoggedIn = () => {
  return !!getCookieValue("csrftoken");
};

export default function Routes() {
  const loggedIn = isUserLoggedIn();

  return (
    <Switch>
      <Route
        path="/"
        element={loggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={loggedIn ? <Navigate to="/" /> : <Auth />}
      />
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
