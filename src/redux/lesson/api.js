import { METHOD } from "helpers/api";
import { LESSON_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";

const baseUrl = LESSON_API;

export const fetchLessons = (params) => {
    const url = baseUrl;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options, params);
}

export const fetchLessonDetail = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.get
    }

    return axiosRequest(url, options);
}