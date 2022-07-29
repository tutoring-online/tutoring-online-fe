import { METHOD, SUBJECT_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";

const baseUrl = SUBJECT_API;

export const fetchSubjects = () => {
    const url = baseUrl;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options);
}

export const fetchSubjectDetail = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.get
    }

    return axiosRequest(url, options);
}

export const createSubject = (data) => {
    const url = baseUrl;
    const options = {
        method: METHOD.post,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const updateSubject = (id, data) => {
    if (!data) return;
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.patch,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const deleteSubject = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.delete
    }

    return axiosRequest(url, options);
}