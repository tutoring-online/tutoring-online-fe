import { METHOD, PAYMENT_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";

const baseUrl = PAYMENT_API;

export const fetchPayments = () => {
    const url = baseUrl;
    const options = {
        method: METHOD.get,
    }

    return axiosRequest(url, options);
}

export const fetchPaymentDetail = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.get
    }

    return axiosRequest(url, options);
}

export const createPayment = (data) => {
    const url = baseUrl;
    const options = {
        method: METHOD.post,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const updatePayment = (id, data) => {
    if (!data) return;
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.patch,
        data: { ...data }
    }

    return axiosRequest(url, options);
}

export const deletePayment = (id) => {
    const url = baseUrl + `/${id}`;
    const options = {
        method: METHOD.delete
    }

    return axiosRequest(url, options);
}