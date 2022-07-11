import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTutorActions from "./useTutorSubjectActions";

const useTutorSubjectList = () => {
    const actions = useTutorActions();

    const tutorSubjectList = useSelector(state => state.tutorSubject.tutorSubjects);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchTutorSubjects({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchTutorSubjects({ setLoading });
    }, [actions])

    return {
        tutorSubjectList,
        loading,
        refresh
    };
}

export default useTutorSubjectList;