import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLessonActions from "./useLessonActions";

const useFilteredLessonList = (filter) => {
    const actions = useLessonActions();

    const filteredLesson = useSelector(state => state.lesson.filteredLesson);
    const [lessonList, setLessonList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAvailableArray(filteredLesson?.data)) {
            setLessonList([]);
            return;
        }

        setLessonList([...filteredLesson.data]);
    }, [filteredLesson])


    useEffect(() => {
        actions.fetchLessonsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        actions.fetchLessonsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    return {
        lessonList,
        loading,
        refresh
    };
}

export default useFilteredLessonList;