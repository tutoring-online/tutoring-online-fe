import { METHOD, TUTOR_SUBJECT_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";

const baseUrl = TUTOR_SUBJECT_API;

export const fetchTutorSubjects = () => {
    const url = baseUrl;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options);
}

// export const createTutorSubject = () => {

// }

// export const deleteTutorSubjects = (id) => {
//     const url = baseUrl + `/${id}`;
//     const options = {
//         method: METHOD.delete
//     }

//     return axiosRequest(url, options);
// }