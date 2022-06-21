import { METHOD, ADMIN_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const fetchAdmins = () => {
    const url = ADMIN_API;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options);
}

export const fetchAdminDetail = (id) => {
    const url = ADMIN_API + `/${id}`;
    const options = {
        method: METHOD.get
    }

    return axiosRequest(url, options);
}

export const createAdmin = (data) => {
    if (!data) return;
    const url = ADMIN_API;
    const options = {
        method: METHOD.POST,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const updateAdmin = (id, data) => {
    if (!data) return;
    const url = ADMIN_API + `/${id}`;
    const options = {
        method: METHOD.patch,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const deleteAdmin = (id) => {
    const url = ADMIN_API + `/${id}`;
    const options = {
        method: METHOD.delete
    }

    return axiosRequest(url, options);
}