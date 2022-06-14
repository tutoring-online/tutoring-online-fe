import { PAYMENT_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const fetchPayments = () => {
    const url = PAYMENT_API;
    const options = {
        method: "GET"
    }
    
    return axiosRequest(url, options);
}