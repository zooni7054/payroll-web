import React from "react";
import { Redirect, Route } from "react-router-dom";

import store from "../redux/store";
import { updateUser } from "../redux/actionCreators";

import { validateToken } from "../apis/admin";

import { ReactReduxContext } from "react-redux";

import { updateToken } from "../utils/axios";

import PageLoader from "../components/PageLoader";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [authStatus, setAuthStatus] = React.useState(false);
  const [loading, setisLoading] = React.useState(true);

  const { store } = React.useContext(ReactReduxContext);

  React.useEffect(() => {
    validation();

    return () => {
      const cleanup = validation();
    };
  }, []);

  const validation = async () => {
    if (store.getState().user.token == null) {
      if (localStorage.getItem("payroll_token") != null) {
        setisLoading(true);
        await validateToken().then((result) => {
          //
          if (result.status === true) {
            store.dispatch(updateUser(result.data));
            setAuthStatus(true);
            setisLoading(false);
          }
        });

        // update auth token
        let token = JSON.parse(localStorage.getItem("payroll_token"));
        updateToken(token);
      } else {
        setisLoading(false);
        setAuthStatus(false);
      }
    } else {
      setisLoading(false);
      setAuthStatus(true);
    }
  };

  if (!loading) {
    return (
      <>
        {authStatus ? (
          <Route
            {...restOfProps}
            render={(props) => <Component {...props} />}
          />
        ) : (
          <Redirect to={"/admin/login"} />
        )}
      </>
    );
  } else {
    return (
      <>
        <PageLoader status={loading} />
      </>
    );
  }
}

export default ProtectedRoute;
