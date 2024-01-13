import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Register from "./pages/register";
import NotFound from "./pages/notFound";
import getCookieValue from "./utils/getCookieValue";

const isUserLoggedIn = () => {
  return !!getCookieValue("csrftoken");
};

export default function Rout() {
  const loggedIn = isUserLoggedIn();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" /> : <Auth />}
        />
        <Route
          path="/register"
          element={loggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
