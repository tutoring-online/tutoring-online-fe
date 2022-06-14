import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/student/asyncThunk";

const useStudentActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchStudents: compose(dispatch, asyncThunks.fetchStudents)
    })

    return actions;
}

export default useStudentActions;