const HEADER = {
  "Content-Type": "application/json",
};

const API = {
  SIGN_IN: "/api/v1/signin",
  LOG_IN: "/api/v1/login",
};

const API_CONSTANTS = {
  SIGN_IN: {
    GET_CONTACT_INFORMATION_BY_ID: `${API.SIGN_IN}/getContactInformationById`,
    SIGN_IN_USER: `${API.SIGN_IN}/signInUser`,
    VERIFY_ENROLL: `${API.SIGN_IN}/verifyEnroll`,
  },
  LOG_IN: {
    SET_LOGIN_HISTORY: `${API.LOG_IN}/setLoginHistory/`,
    VERIFY_LOGIN: `${API.LOG_IN}/verifyLogin`,
  },
};

export { API_CONSTANTS, HEADER };
