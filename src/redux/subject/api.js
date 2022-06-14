import { SUBJECT_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


//Get
export const fetchSubjects = () => {
    const url = SUBJECT_API;
    const options = {
        method: "GET"
    }

    return axiosRequest(url, options);
}