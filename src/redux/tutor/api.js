import { TUTOR_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const fetchTutors = () => {
    const url = TUTOR_API;
    const options = {
        method: "GET"
    }
    
    return axiosRequest(url, options);
}
