const HEADER = {
  "Content-Type": "application/json",
};

const API = {
  SIGN_IN: "/api/v1/signin",
  LOG_IN: "/api/v1/login",
  SYSTEM_CONFIGURATION: "/api/v1/systemConfiguration",
  SYSTEM_USER: "/api/v1/systemUser",
  CATALOGS: "/api/v1/catalogs",
  META_MAP: "/api/v1/verification",
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
    GET_USER_PROFILE: `${API.LOG_IN}/getUserProfile`,
  },
  SYSTEM_CONFIGURATION: {
    GET_ALL_LABELS: `${API.SYSTEM_CONFIGURATION}/getAllLabels`,
  },
  SYSTEM_USER: {
    GET_PIPELINE: `${API.SYSTEM_USER}/getPipeline`,
    IS_SERVICE_READY: `${API.SYSTEM_USER}/isServiceReady`,
    SET_PIPELINE_STEP: `${API.SYSTEM_USER}/setPipelineStep/`,
    SET_VEHICLE: `${API.SYSTEM_USER}/setVehicle/`,
    GET_PAWN_DOCUMENTS: `${API.SYSTEM_USER}/getPawnDocuments`,
    SET_CUSTOMER_IN_DOCUMENT: `${API.SYSTEM_USER}/setCustomerInDocument`,
  },
  CATALOGS: {
    GET_ALL_COUNTRIES: `${API.CATALOGS}/getAllCountries`,
  },
  META_MAP: {
    CREATE_VERIFICATION: `${API.META_MAP}/createVerification`,
  },
};

export { API_CONSTANTS, HEADER };
