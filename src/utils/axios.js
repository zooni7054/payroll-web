import Axios from "axios";
import CONSTANTS from "./constants";

const axios = Axios.create({
  baseURL: CONSTANTS.apiURL,
});

let token = JSON.parse(localStorage.getItem("payroll_token"));

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

const updateToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export { axios, updateToken };
