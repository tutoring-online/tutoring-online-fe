import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TUTOR_STATUSES } from "settings/tutor-setting";
import useTutorActions from "./useTutorActions";

const useTutorList = () => {
    const actions = useTutorActions();

    const data = useSelector(state => state.tutor.tutors);
    const [tutorList, setTutorList] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchTutors({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchTutors({ setLoading });
    }, [actions])

    useEffect(() => {
        if (!isAvailableArray(data)) {
            setTutorList([]);
            return;
        }

        setTutorList(data.filter(item => item.status !== TUTOR_STATUSES.BANNED))
    }, [data])

    return {
        tutorList,
        loading,
        refresh
    };
}

export default useTutorList;