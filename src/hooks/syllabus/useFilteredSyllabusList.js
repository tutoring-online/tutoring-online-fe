import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSyllabusActions from "./useSyllabusActions";

const useFilteredSyllabusList = (filter) => {
    const actions = useSyllabusActions();

    const syllabusList = useSelector(state => state.syllabus.filteredSyllabuses);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchSyllabusesWithFilter({ filter, setLoading });
    }, [actions, filter])

    const refresh = useCallback(() => {
        actions.fetchSyllabusesWithFilter({ filter, setLoading });
    }, [actions, filter])

    console.log(syllabusList);

    return {
        syllabusList,
        loading,
        refresh
    };
}

export default useFilteredSyllabusList;