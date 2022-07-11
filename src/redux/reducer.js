import { combineReducers } from "redux";
import { adminReducer } from "./admin/slice";
import { authReducer } from "./auth/slice";
import { categoryReducer } from "./category/slice";
import { paymentReducer } from "./payment/slice";
import { studentReducer } from "./student/slice";
import { subjectReducer } from "./subject/slice";
import { syllabusReducer } from "./syllabus/slice";
import { tutorSubjectReducer } from "./tutor-subject/slice";
import { tutorReducer } from "./tutor/slice";

export default combineReducers({
    auth: authReducer,
    admin: adminReducer,
    student: studentReducer,
    subject: subjectReducer,
    syllabus: syllabusReducer,
    payment: paymentReducer,
    category: categoryReducer,
    tutor: tutorReducer,
    tutorSubject: tutorSubjectReducer,
})