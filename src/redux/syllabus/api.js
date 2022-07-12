import { METHOD, SYLLABUS_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";

const baseUrl = SYLLABUS_API;

export const fetchSyllabuses = (params) => {
    const url = baseUrl;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options, params);
}

export const fetchSyllabusDetail = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.get
    }

    return axiosRequest(url, options);
}

export const createSyllabus = (data) => {
    const url = baseUrl;
    const options = {
        method: METHOD.post,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const updateSyllabus = (id, data) => {
    if (!data) return;
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.patch,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const deleteSyllabus = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.delete
    }

    return axiosRequest(url, options);
}