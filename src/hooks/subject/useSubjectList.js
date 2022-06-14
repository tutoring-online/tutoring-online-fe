import { useEffect } from "react";
import { useSelector } from "react-redux";
import useSubjectActions from "./useSubjectActions.js";

const useSubjectList = () => {
    const subjectList = useSelector(state => state.subject.subjects);
    const actions = useSubjectActions();

    useEffect(() => {
        actions.fetchSubjects();
    }, [actions])
    
    return subjectList;
}

export default useSubjectList;