
//Domain
export const LOCAL_API_DOMAIN = process.env.REACT_APP_LOCAL_API_URL;
export const PRODUCTION_API_DOMAIN = process.env.REACT_APP_PRODUCT_API_URL;
export const ENV_DOMAIN = PRODUCTION_API_DOMAIN;

//Api path and version
export const ENV_API_VERSION = "v1";
export const ENV_API = `/api/${ENV_API_VERSION}`

//API path
export const LESSON_API = `${ENV_API}/lessons`;


