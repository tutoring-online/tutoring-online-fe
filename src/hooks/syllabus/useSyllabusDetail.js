import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSyllabusActions from "./useSyllabusActions";


const useSyllabusDetail = (id) => {
    const actions = useSyllabusActions();
    const syllabusDetail = useSelector(state => state.syllabus.syllabusDetail);
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
        if (!id) return;
        actions.clearSyllabusDetail();
        actions.fetchSyllabusDetail({ id, setLoading: loadingCallback });
    }, [actions, id, loadingCallback]);

    const refresh = useCallback(() => {
        if (!id) return;
        actions.clearSyllabusDetail();
        actions.fetchSyllabusDetail({ id, setLoading: loadingCallback });
    }, [actions, id, loadingCallback])

    return {
        syllabusDetail,
        loading,
        refresh
    };
}

export default useSyllabusDetail;