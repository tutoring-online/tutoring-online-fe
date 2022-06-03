import { combineReducers } from "redux";
import { authReducer } from "./auth/slice";

export default combineReducers({
    auth: authReducer
})