import { ADMIN_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const fetchAdmins = () => {
    const url = ADMIN_API;
    const options = {
        method: "GET"
    }
    
    return axiosRequest(url, options);
}