import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSubjectActions from "./useSubjectActions";

const useSubjectList = () => {
    const actions = useSubjectActions();

    const subjectList = useSelector(state => state.subject.subjects);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchSubjects({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchSubjects({ setLoading });
    }, [actions])

    return {
        subjectList,
        loading,
        refresh
    };
}

export default useSubjectList;