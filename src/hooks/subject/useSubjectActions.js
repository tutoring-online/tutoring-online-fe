import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/subject/asyncThunk";
import * as types from "redux/subject/types";
import { actions as reduxActions } from "redux/subject/slice";

const useSubjectActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchSubjectDetail: compose(dispatch, asyncThunks.fetchSubjectDetail),
        clearSubjectDetail: compose(dispatch, reduxActions[types.CLEAR_SUBJECT_DETAIL]),
        fetchSubjects: compose(dispatch, asyncThunks.fetchSubjects),
        createSubject: compose(dispatch, asyncThunks.createSubject),
        updateSubject: compose(dispatch, asyncThunks.updateSubject),
        deleteSubject: compose(dispatch, asyncThunks.deleteSubject),
    })

    return actions;
}

export default useSubjectActions;