const HEADER = {
  "Content-Type": "application/json",
};

const API = {
  SIGN_IN: "/api/v1/signin",
};

const API_CONSTANTS = {
  SIGN_IN: {
    GET_CONTACT_INFORMATION_BY_ID: `${API.SIGN_IN}/getContactInformationById`,
    SIGN_IN_USER: `${API.SIGN_IN}/signInUser`,
    VERIFY_ENROLL: `${API.SIGN_IN}/verifyEnroll`,
  },
};

export { API_CONSTANTS, HEADER };
