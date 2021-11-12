import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import user from "./reducers/user";

const composeEnhancers = composeWithDevTools({ realtime: true });

const store = createStore(
  combineReducers({ user }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
