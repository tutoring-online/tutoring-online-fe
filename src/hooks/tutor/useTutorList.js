import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTutorActions from "./useTutorActions";

const useTutorList = () => {
    const actions = useTutorActions();

    const tutorList = useSelector(state => state.tutor.tutors);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchTutors({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchTutors({ setLoading });
    }, [actions])

    return {
        tutorList,
        loading,
        refresh
    };
}

export default useTutorList;