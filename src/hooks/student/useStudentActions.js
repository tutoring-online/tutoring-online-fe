import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/student/asyncThunk";

const useStudentActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchStudents: compose(dispatch, asyncThunks.fetchStudents),
        fetchStudentDetail: compose(dispatch, asyncThunks.fetchStudentDetail),
        updateStudent: compose(dispatch, asyncThunks.updateStudent),
        deleteStudent: compose(dispatch, asyncThunks.deleteStudent),
    })

    return actions;
}

export default useStudentActions;