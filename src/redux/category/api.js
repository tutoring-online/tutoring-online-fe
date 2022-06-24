import { METHOD, CATEGORY_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";

const baseUrl = CATEGORY_API;

export const fetchCategories = () => {
    const url = baseUrl;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options);
}

export const fetchCategoryDetail = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.get
    }

    return axiosRequest(url, options);
}

export const createCategory = (data) => {
    const url = baseUrl;
    const options = {
        method: METHOD.post,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const updateCategory = (id, data) => {
    if (!data) return;
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.patch,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const deleteCategory = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.delete
    }

    return axiosRequest(url, options);
}