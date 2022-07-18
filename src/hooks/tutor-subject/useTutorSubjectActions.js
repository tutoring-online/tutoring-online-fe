import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/tutor-subject/asyncThunk";

const useTutorSubjectActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchTutorSubjects: compose(dispatch, asyncThunks.fetchTutorSubjects),
        getTutorSubject: compose(dispatch, asyncThunks.getTutorSubject)
    })

    return actions;
}

export default useTutorSubjectActions;