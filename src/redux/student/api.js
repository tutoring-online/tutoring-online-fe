import { STUDENT_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const fetchStudents = () => {
    const url = STUDENT_API;
    const options = {
        method: "GET"
    }
    
    return axiosRequest(url, options);
}