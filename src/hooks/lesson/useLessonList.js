import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLessonActions from "./useLessonActions";

const useLessonList = () => {
    const actions = useLessonActions();

    const lessonList = useSelector(state => state.lesson.lessons);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchLessons({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchLessons({ setLoading });
    }, [actions])

    return {
        lessonList,
        loading,
        refresh
    };
}

export default useLessonList;