import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSyllabusActions from "./useSyllabusActions";


const useSyllabusDetail = (id) => {
    const actions = useSyllabusActions();
    const syllabusDetail = useSelector(state => state.syllabus.syllabusDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearSyllabusDetail();
        actions.fetchSyllabusDetail({ id, setLoading });
    }, [actions, id]);

    const refresh = useCallback(() => {
        if (!id) return;
        actions.clearSyllabusDetail();
        actions.fetchSyllabusDetail({ id, setLoading });
    }, [actions, id])

    return {
        syllabusDetail,
        loading,
        refresh
    };
}

export default useSyllabusDetail;