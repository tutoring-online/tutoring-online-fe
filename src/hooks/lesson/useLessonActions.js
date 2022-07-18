import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/lesson/asyncThunk";
import * as types from "redux/lesson/types";
import { actions as reduxActions } from "redux/lesson/slice";

const useLessonActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchLessonDetail: compose(dispatch, asyncThunks.fetchLessonDetail),
        clearLessonDetail: compose(dispatch, reduxActions[types.CLEAR_LESSON_DETAIL]),
        
        fetchLessons: compose(dispatch, asyncThunks.fetchLessons),
        fetchLessonsWithFilter: compose(dispatch, asyncThunks.fetchLessonsWithFilter),
    })

    return actions;
}

export default useLessonActions;