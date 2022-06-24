import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/subject/asyncThunk";

const useSubjectActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchSubjects: compose(dispatch, asyncThunks.fetchSubjects),
        fetchSubjectDetail: compose(dispatch, asyncThunks.fetchSubjectDetail),
        createSubject: compose(dispatch, asyncThunks.createSubject),
        updateSubject: compose(dispatch, asyncThunks.updateSubject),
        deleteSubject: compose(dispatch, asyncThunks.deleteSubject),
    })

    return actions;
}

export default useSubjectActions;