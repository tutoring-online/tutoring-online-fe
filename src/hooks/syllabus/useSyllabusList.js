import { useEffect } from "react";
import { useSelector } from "react-redux";
import useSyllabusActions from "./useSyllabusActions.js";

const useSyllabusList = () => {
    const syllabusList = useSelector(state => state.syllabus.syllabuses);
    const actions = useSyllabusActions();

    useEffect(() => {
        actions.fetchSyllabuses();
    }, [actions])
    
    return syllabusList;
}

export default useSyllabusList;