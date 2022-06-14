import { combineReducers } from "redux";
import { adminReducer } from "./admin/slice";
import { authReducer } from "./auth/slice";

export default combineReducers({
    auth: authReducer,
    admin: adminReducer
})