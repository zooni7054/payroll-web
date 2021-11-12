import React from "react";
import store from "../redux/store";
import { updateUser } from "../redux/actionCreators";

import { validateToken } from "../apis/admin";

export default function Auth() {
  const result = validateToken()
    .then((result) => {
      //
      if (result.status === true) {
        store.dispatch(updateUser(result.data));
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });

  return result;
}
