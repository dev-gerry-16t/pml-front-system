import { API_CONSTANTS, HEADER } from "../constants/apiConstants";
import RequesterAxios from "../requester/requester";
import isNil from "lodash/isNil";

const callGlobalActionApi =
  (data, id, CONSTANT, method = "POST", token = true, headers = {}) =>
  async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    let response;
    if (token === true) {
      HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    }

    try {
      const config = {
        headers: {
          ...HEADER,
          ...headers,
        },
      };
      if (method === "POST") {
        response = await RequesterAxios.post(
          CONSTANT,
          { ...data, offset: getTimeZone() },
          config,
          token
        );
      } else if (method === "PUT") {
        response = await RequesterAxios.put(
          CONSTANT + id,
          { ...data, offset: getTimeZone() },
          config,
          token
        );
      } else {
        response = await RequesterAxios.post(
          CONSTANT,
          { ...data, offset: getTimeZone() },
          config,
          token
        );
      }
      const responseResultStatus =
        isNil(response) === false && isNil(response.status) === false
          ? response.status
          : null;
      const responseResultMessage =
        isNil(response) === false &&
        isNil(response.data) === false &&
        isNil(response.data.response) === false &&
        isNil(response.data.response.message) === false
          ? response.data.response.message
          : null;
      const responseResultData =
        isNil(response) === false && isNil(response.data) === false
          ? response.data
          : null;
      if (
        isNil(responseResultStatus) === false &&
        responseResultStatus === 200
      ) {
        return responseResultData;
      } else {
        throw isNil(responseResultMessage) === false
          ? responseResultMessage
          : null;
      }
    } catch (error) {
      throw error;
    }
  };

const callAddDocument =
  (file, data, callback) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileProperties", JSON.stringify(data));
    try {
      const config = {
        headers: { ...HEADER },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          callback(percentCompleted);
        },
      };
      const response = await RequesterAxios.post(
        API_CONSTANTS.ADD_DOCUMENT,
        formData,
        config
      );
      const responseResultStatus =
        isNil(response) === false && isNil(response.status) === false
          ? response.status
          : null;
      const responseResultMessage =
        isNil(response) === false &&
        isNil(response.data) === false &&
        isNil(response.data.response) === false &&
        isNil(response.data.response.message) === false
          ? response.data.response.message
          : null;
      const responseResultData =
        isNil(response) === false && isNil(response.data) === false
          ? response.data
          : null;
      if (
        isNil(responseResultStatus) === false &&
        responseResultStatus === 200
      ) {
        return responseResultData;
      } else {
        throw isNil(responseResultMessage) === false
          ? responseResultMessage
          : null;
      }
    } catch (error) {
      throw error;
    }
  };

const getTimeZone = () => {
  var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
  return (
    (offset < 0 ? "+" : "-") +
    ("00" + Math.floor(o / 60)).slice(-2) +
    ":" +
    ("00" + (o % 60)).slice(-2)
  );
};

export { callAddDocument, callGlobalActionApi };
