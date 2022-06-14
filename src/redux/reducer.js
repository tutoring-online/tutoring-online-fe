import { combineReducers } from "redux";
import { adminReducer } from "./admin/slice";
import { authReducer } from "./auth/slice";
import { paymentReducer } from "./payment/slice";
import { studentReducer } from "./student/slice";
import { subjectReducer } from "./subject/slice";
import { syllabusReducer } from "./syllabus/slice";
import { tutorReducer } from "./tutor/slice";

export default combineReducers({
    auth: authReducer,
    admin: adminReducer,
    tutor: tutorReducer,
    student: studentReducer,
    subject: subjectReducer,
    syllabus: syllabusReducer,
    payment: paymentReducer,
})