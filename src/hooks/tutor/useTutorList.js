import { useEffect } from "react";
import { useSelector } from "react-redux";
import useTutorActions from "./useTutorActions.js";

const useTutorList = () => {
    const tutorList = useSelector(state => state.tutor.tutors);
    const actions = useTutorActions();

    useEffect(() => {
        actions.fetchTutors();
    }, [actions])
    
    return tutorList;
}

export default useTutorList;