import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/syllabus/asyncThunk";

const useSyllabusActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchSyllabuses: compose(dispatch, asyncThunks.fetchSyllabuses),
        fetchSyllabusDetail: compose(dispatch, asyncThunks.fetchSyllabusDetail),
        createSyllabus: compose(dispatch, asyncThunks.createSyllabus),
        updateSyllabus: compose(dispatch, asyncThunks.updateSyllabus),
        deleteSyllabus: compose(dispatch, asyncThunks.deleteSyllabus),
    })

    return actions;
}

export default useSyllabusActions;