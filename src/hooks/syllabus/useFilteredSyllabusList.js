import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSyllabusActions from "./useSyllabusActions";

const useFilteredSyllabusList = (filter) => {
    const actions = useSyllabusActions();

    const filteredSyllabuses = useSelector(state => state.syllabus.filteredSyllabuses);
    const [syllabusList, setSyllabusList] = useState([]);
    const [loading, setLoading] = useState(false);

    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [])

    const loadingCallback = useCallback((isLoading) => {
        if (mounted.current === true) {
            setLoading(Boolean(isLoading));
        }
    }, []);

    useEffect(() => {
        if (!isAvailableArray(filteredSyllabuses.data)) {
            setSyllabusList([]);
            return;
        }

        setSyllabusList([...filteredSyllabuses.data]);
    }, [filteredSyllabuses])


    useEffect(() => {
        actions.fetchSyllabusesWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);

    const refresh = useCallback(() => {
        actions.fetchSyllabusesWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);

    return {
        syllabusList,
        loading,
        refresh
    };
}

export default useFilteredSyllabusList;