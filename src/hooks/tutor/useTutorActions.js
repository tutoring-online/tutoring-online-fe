import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/tutor/asyncThunk";

const useTutorActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchTutors: compose(dispatch, asyncThunks.fetchTutors),
        fetchTutorDetail: compose(dispatch, asyncThunks.fetchTutorDetail),
        updateTutor: compose(dispatch, asyncThunks.updateTutor),
        deleteTutor: compose(dispatch, asyncThunks.deleteTutor),
    })

    return actions;
}

export default useTutorActions;