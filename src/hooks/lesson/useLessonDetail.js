import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLessonActions from "./useLessonActions";

const useLessonDetail = (id) => {
    const actions = useLessonActions();
    const lessonDetail = useSelector(state => state.lesson.lessonDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearLessonDetail();
        actions.fetchLessonDetail({ id, setLoading });
    }, [actions, id]);

    const refresh = useCallback(() => {
        if (!id) return;
        actions.clearLessonDetail();
        actions.fetchLessonDetail({ id, setLoading });
    }, [actions, id])

    return {
        lessonDetail,
        loading,
        refresh
    };
}

export default useLessonDetail;