import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TUTOR_SUBJECT_STATUSES } from "settings/tutor-subject-setting";
import useTutorActions from "./useTutorSubjectActions";

const useTutorSubjectList = () => {
    const actions = useTutorActions();

    const data = useSelector(state => state.tutorSubject.tutorSubjects);
    const [tutorSubjectList, setTutorSubjectList] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchTutorSubjects({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchTutorSubjects({ setLoading });
    }, [actions])

    useEffect(() => {
        if (!isAvailableArray(data)) {
            setTutorSubjectList([]);
            return;
        }

        setTutorSubjectList(data.filter(item => item.status !== TUTOR_SUBJECT_STATUSES.DELETED))
    }, [data])


    return {
        tutorSubjectList,
        loading,
        refresh
    };
}

export default useTutorSubjectList;