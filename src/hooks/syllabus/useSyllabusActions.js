import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/syllabus/asyncThunk";

const useSyllabusActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchSyllabuses: compose(dispatch, asyncThunks.fetchSyllabuses)
    })

    return actions;
}

export default useSyllabusActions;