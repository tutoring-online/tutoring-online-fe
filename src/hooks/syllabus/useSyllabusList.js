import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSyllabusActions from "./useSyllabusActions";

const useSyllabusList = () => {
    const actions = useSyllabusActions();

    const syllabusList = useSelector(state => state.syllabus.syllabuses);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchSyllabuses({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchSyllabuses({ setLoading });
    }, [actions])

    return {
        syllabusList,
        loading,
        refresh
    };
}

export default useSyllabusList;