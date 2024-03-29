import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStudentActions from "./useStudentActions";


const useStudentDetail = (id) => {
    const actions = useStudentActions();
    const studentDetail = useSelector(state => state.student.studentDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearStudentDetail();
        actions.fetchStudentDetail({ id, setLoading });
    }, [actions, id]);

    const refresh = useCallback(() => {
        if (!id) return;
        actions.clearStudentDetail();
        actions.fetchStudentDetail({ id, setLoading });
    }, [actions, id])

    return {
        studentDetail,
        loading,
        refresh
    };
}

export default useStudentDetail;