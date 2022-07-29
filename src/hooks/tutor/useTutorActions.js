import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/tutor/asyncThunk";
import * as types from "redux/tutor/types";
import { actions as reduxActions } from "redux/tutor/slice";

const useTutorActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchTutorDetail: compose(dispatch, asyncThunks.fetchTutorDetail),
        clearTutorDetail: compose(dispatch, reduxActions[types.CLEAR_TUTOR_DETAIL]),

        fetchTutorsWithFilter: compose(dispatch, asyncThunks.fetchTutorsWithFilter),
        fetchTutors: compose(dispatch, asyncThunks.fetchTutors),
        updateTutor: compose(dispatch, asyncThunks.updateTutor),
        deleteTutor: compose(dispatch, asyncThunks.deleteTutor),
    })

    return actions;
}

export default useTutorActions;