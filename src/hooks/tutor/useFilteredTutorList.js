import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTutorActions from "./useTutorActions";

const useFilteredTutorList = (filter) => {
    const actions = useTutorActions();

    const filteredTutors = useSelector(state => state.tutor.filteredTutors);
    const [tutorList, setTutorList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = (isAvailableArray(filteredTutors)) ?
            filteredTutors : filteredTutors?.data;

        if (!isAvailableArray(data)) {
            setTutorList([]);
            return;
        }

        setTutorList([...data]);
    }, [filter, filteredTutors])


    useEffect(() => {
        actions.fetchTutorsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        actions.fetchTutorsWithFilter({ filter, setLoading });
    }, [actions, filter]);


    return {
        tutorList,
        loading,
        refresh
    };
}

export default useFilteredTutorList;