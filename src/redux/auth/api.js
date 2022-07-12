import { AUTHENTICATION_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const loginUser = (token) => {
    const url = AUTHENTICATION_API + "/login";
    const options = {
        method: "POST",
        data: {
            token
        }
    }
    
    return axiosRequest(url, options);
}

export const signupUser = (token, role) => {
    const url = AUTHENTICATION_API + "/signup";
    const options = {
        method: "POST",
        data: {
            token,
            role: role || null
        }
    }
    
    return axiosRequest(url, options);
}