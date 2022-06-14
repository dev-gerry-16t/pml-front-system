const DOMAIN_WEB = "app.homify.ai";
const DOMAIN_WEB_TEST = "apptest.homify.ai";
const DOMAIN_WEB_LOCAL = "localhost";

const INSTANCE_LOCAL = {
  DNS_API: "localhost",
  API_PROTOCOL: "http://",
  PORT: "3001",
};

const INSTANCE_TEST = {
  DNS_API: "apitest.prendamovil.com",
  API_PROTOCOL: "https://",
  PORT: "",
};

const INSTANCE_PRODUCTION = {
  DNS_API: "api.prendamovil.com", //hfy-back-system.herokuapp.com
  API_PROTOCOL: "https://",
  PORT: "",
};

let ENVIROMENT = "";

const getEnviroment = () => {
  let location = null;
  if (window.location.hostname === DOMAIN_WEB) {
    location = `${INSTANCE_PRODUCTION.API_PROTOCOL}${INSTANCE_PRODUCTION.DNS_API}`;
  } else if (window.location.hostname === DOMAIN_WEB_TEST) {
    location = `${INSTANCE_TEST.API_PROTOCOL}${INSTANCE_TEST.DNS_API}`;
  } else if (window.location.hostname === DOMAIN_WEB_LOCAL) {
    location = `${INSTANCE_LOCAL.API_PROTOCOL}${INSTANCE_LOCAL.DNS_API}:${INSTANCE_LOCAL.PORT}`;
  } else {
    location = `${INSTANCE_LOCAL.API_PROTOCOL}${window.location.hostname}:${INSTANCE_LOCAL.PORT}`;
  }

  return location;
};

ENVIROMENT = getEnviroment();

//ENVIROMENT=`${INSTANCE_TEST.API_PROTOCOL}${INSTANCE_TEST.DNS_API}`;

//ENVIROMENT=`${INSTANCE_PRODUCTION.API_PROTOCOL}${INSTANCE_PRODUCTION.DNS_API}`;

export default ENVIROMENT;
