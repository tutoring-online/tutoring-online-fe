import { AUTHENTICATION_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const loginUser = (token, role) => {
    const url = AUTHENTICATION_API;
    const options = {
        method: "POST",
        data: {
            token,
            role: role || null
        }
    }
    
    return axiosRequest(url, options);
}