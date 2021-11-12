import { axios } from "../utils/axios";
import queryString from "query-string";

export const getStates = (query = "") => {
  let qs = queryString.parse(query);
  const result = axios
    .get(`cities?${queryString.stringify(qs)}`)
    .then(function (response) {
      return {
        data: response.data.data,
        status: response.data.success,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return { status: "error", message: "Data Fetching Failed!" };
    });

  return result;
};

export const validateToken = () => {
  const result = axios
    .post(`admin/validate-token`)
    .then(function (response) {
      return {
        data: response.data.data,
        status: response.data.success,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return { status: "error", message: "Token Validation Failed" };
    });

  return result;
};

export const logout = () => {
  const result = axios
    .get(`admin/logout`)
    .then(function (response) {
      return {
        data: response.data.data,
        status: response.data.success,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return { status: "error", message: "Logout Failed" };
    });

  return result;
};

export const login = (data) => {
  const result = axios
    .post(`admin/login`, data)
    .then(function (response) {
      return {
        data: response.data.data,
        status: response.data.success,
        message: response.data.message,
      };
    })
    .catch((error) => {
      return { status: "error", message: "Logout Failed" };
    });

  return result;
};
