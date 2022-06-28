import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/student/asyncThunk";
import * as types from "redux/student/types";
import { actions as reduxActions } from "redux/student/slice";

const useStudentActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchStudentDetail: compose(dispatch, asyncThunks.fetchStudentDetail),
        clearStudentDetail: compose(dispatch, reduxActions[types.CLEAR_STUDENT_DETAIL]),
        fetchStudents: compose(dispatch, asyncThunks.fetchStudents),
        updateStudent: compose(dispatch, asyncThunks.updateStudent),
        deleteStudent: compose(dispatch, asyncThunks.deleteStudent),
    })

    return actions;
}

export default useStudentActions;