import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSyllabusActions from "./useSyllabusActions";

const useFilteredSyllabusList = (filter) => {
    const actions = useSyllabusActions();

    const filteredSyllabuses = useSelector(state => state.syllabus.filteredSyllabuses);
    const [syllabusList, setSyllabusList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAvailableArray(filteredSyllabuses.data)) {
            setSyllabusList([]);
            return;
        }

        setSyllabusList([...filteredSyllabuses.data]);
    }, [filteredSyllabuses])


    useEffect(() => {
        actions.fetchSyllabusesWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        actions.fetchSyllabusesWithFilter({ filter, setLoading });
    }, [actions, filter]);

    return {
        syllabusList,
        loading,
        refresh
    };
}

export default useFilteredSyllabusList;