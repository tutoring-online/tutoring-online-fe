import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { actions } from "redux/tutor/slice";
import { SET_TUTOR_PROFILE } from "redux/tutor/types";

const useTutorActions = () => {
    const dispatch = useDispatch();
    const [tutorActions] = useState({
        setTutorProfile: compose(dispatch, actions[SET_TUTOR_PROFILE]),
    })

    return tutorActions;
}

export default useTutorActions;