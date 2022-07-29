import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useTutorActions from "./useTutorActions";

const useFilteredTutorList = (filter) => {
    const actions = useTutorActions();

    const filteredTutors = useSelector(state => state.tutor.filteredTutors);
    const [tutorList, setTutorList] = useState([]);
    const [loading, setLoading] = useState(false);

    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return() => mounted.current = false;
    }, [])

    const loadingCallback = useCallback((isLoading) => {
        if(mounted.current === true) {
            setLoading(Boolean(isLoading));
        }
    }, []);

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
        actions.fetchTutorsWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);

    const refresh = useCallback(() => {
        actions.fetchTutorsWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);


    return {
        tutorList,
        loading,
        refresh
    };
}

export default useFilteredTutorList;