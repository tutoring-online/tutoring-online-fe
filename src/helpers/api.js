
//Domain
export const LOCAL_API_DOMAIN = process.env.REACT_APP_LOCAL_API_URL;
export const PRODUCTION_API_DOMAIN = process.env.REACT_APP_PRODUCT_API_URL;
export const ENV_DOMAIN = PRODUCTION_API_DOMAIN;
// export const ENV_DOMAIN = LOCAL_API_DOMAIN;

// Method
export const METHOD = {
    get: "GET",
    post: "POST",
    put: "PUT",
    patch: "PATCH",
    delete: "DELETE"
}

//Api path and version
export const ENV_API_VERSION = "v1";
export const ENV_API = `/api/${ENV_API_VERSION}`

//API path
export const AUTHENTICATION_API = `${ENV_API}/authentication`;
export const PAYMENT_API = `${ENV_API}/payments`;
export const SUBJECT_API = `${ENV_API}/subjects`;
export const SYLLABUS_API = `${ENV_API}/syllabuses`;
export const LESSON_API = `${ENV_API}/lessons`;

export const ADMIN_API = `${ENV_API}/admins`;
export const TUTOR_API = `${ENV_API}/tutors`;
export const STUDENT_API = `${ENV_API}/students`;

