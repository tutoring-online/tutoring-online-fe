import { METHOD, STUDENT_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";

const baseUrl = STUDENT_API;

export const fetchStudents = (params) => {
    const url = baseUrl;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options, params);
}

export const fetchStudentDetail = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.get
    }

    return axiosRequest(url, options);
}

export const updateStudent = (id, data) => {
    if (!data) return;
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.patch,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const deleteStudent = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.delete
    }

    return axiosRequest(url, options);
}