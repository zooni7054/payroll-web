import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import { adminUrls } from "../utils/urls";

import ProtectedRoute from "./protectedRoute";

import Nav from "../pages/Nav";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Login from "../sections/admin/screens/Login";
import Logout from "../sections/admin/screens/Logout";
import Index from "../sections/admin/layout";
import Home from "../sections/admin/screens/Home";
import TableExample from "../sections/admin/screens/Table";

function AdminRoutes() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path={`${adminUrls.Home}`} exact>
          <Index title="Dashboard">
            <Home />
          </Index>
        </ProtectedRoute>
        <ProtectedRoute path={`${adminUrls.About}`} exact>
          <Index title="About Us">
            <About />
          </Index>
        </ProtectedRoute>
        <ProtectedRoute path={`${adminUrls.Shop}`} exact>
          <Index title="Shop">
            <Shop />
          </Index>
        </ProtectedRoute>
        <ProtectedRoute path={`${adminUrls.Table}`} exact>
          <Index title="Data Table">
            <TableExample />
          </Index>
        </ProtectedRoute>
        <Route path={`${adminUrls.Login}`} exact component={Login} />
        <Route path={`${adminUrls.Logout}`} exact component={Logout} />
      </Switch>
    </Router>
  );
}

export default AdminRoutes;
