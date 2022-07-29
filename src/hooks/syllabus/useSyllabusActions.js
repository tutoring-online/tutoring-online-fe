import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/syllabus/asyncThunk";
import * as types from "redux/syllabus/types";
import { actions as reduxActions } from "redux/syllabus/slice";

const useSyllabusActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchSyllabusDetail: compose(dispatch, asyncThunks.fetchSyllabusDetail),
        clearSyllabusDetail: compose(dispatch, reduxActions[types.CLEAR_SYLLABUS_DETAIL]),
        fetchSyllabuses: compose(dispatch, asyncThunks.fetchSyllabuses),
        fetchSyllabusesWithFilter: compose(dispatch, asyncThunks.fetchSyllabusesWithFilter),
        createSyllabus: compose(dispatch, asyncThunks.createSyllabus),
        updateSyllabus: compose(dispatch, asyncThunks.updateSyllabus),
        deleteSyllabus: compose(dispatch, asyncThunks.deleteSyllabus),

        updateFilter: compose(dispatch, reduxActions[types.UPDATE_FILTER]),
    })

    return actions;
}

export default useSyllabusActions;