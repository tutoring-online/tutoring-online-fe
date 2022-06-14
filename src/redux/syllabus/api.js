
import { SYLLABUS_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const fetchSyllabuses = () => {
    const url = SYLLABUS_API;
    const options = {
        method: "GET"
    }
    
    return axiosRequest(url, options);
}