

import { BrowserRouter as Router, Routes as Switch, Route, Link } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import NotFound from "./pages/notFound";

export default function Routes() {
  return (
        <Switch>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Auth/>}/>
          <Route element={<NotFound/>}/>
        </Switch>
  );
}