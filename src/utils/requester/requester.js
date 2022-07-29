import axios from "axios";
import ENVIROMENT from "../constants/enviroments";

const axiosInstance = axios.create({
  timeout: 35000,
  validateStatus: function (status) {
    return status >= 200 && status < 600;
  },
});

const RequesterAxios = {
  get: async (path, config) => {
    try {
      const endPoint = `${ENVIROMENT}${path}`;
      const response = await axiosInstance.get(endPoint, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (path, body, config, token) => {
    try {
      const endPoint = `${ENVIROMENT}${path}`;
      const response = await axiosInstance.post(endPoint, body, config);
      if (response.status === 401) {
        if (token === true) {
          window.location.href = "/logout";
        }
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (path, body, config, token) => {
    try {
      const endPoint = `${ENVIROMENT}${path}`;
      const response = await axiosInstance.put(endPoint, body, config);
      if (response.status === 401) {
        if (token === true) {
          window.location.href = "/logout";
        }
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default RequesterAxios;
