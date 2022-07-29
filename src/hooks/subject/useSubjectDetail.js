import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSubjectActions from "./useSubjectActions";


const useSubjectDetail = (id) => {
    const actions = useSubjectActions();
    const subjectDetail = useSelector(state => state.subject.subjectDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearSubjectDetail();
        actions.fetchSubjectDetail({ id, setLoading });
    }, [actions, id]);

    const refresh = useCallback(() => {
        if (!id) return;
        actions.clearSubjectDetail();
        actions.fetchSubjectDetail({ id, setLoading });
    }, [actions, id])

    return {
        subjectDetail,
        loading,
        refresh
    };
}

export default useSubjectDetail;