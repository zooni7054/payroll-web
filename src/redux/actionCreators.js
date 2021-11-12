import * as ActionTypes from "./actionTypes";

// User related actions
export const setUser = (value) => {
  return {
    type: ActionTypes.SET_USER,
    payload: value,
  };
};

export const updateUser = (value) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: value,
  };
};

export const clearUser = () => {
  return {
    type: ActionTypes.CLEAR_USER,
  };
};
