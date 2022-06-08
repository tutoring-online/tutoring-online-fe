import { LESSON_API } from "helpers/api";
import { axiosRequest } from "helpers/axios";


export const fetchAllLessons = () => {
    const url = LESSON_API;
    const options = {
        method: "GET"
    }
    return axiosRequest(url, options)
}