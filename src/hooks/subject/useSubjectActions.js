import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/subject/asyncThunk";

const useSubjectActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchSubjects: compose(dispatch, asyncThunks.fetchSubjects)
    })

    return actions;
}

export default useSubjectActions;