import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLessonActions from "./useLessonActions";

const useFilteredLessonList = (filter) => {
    const actions = useLessonActions();

    const filteredLessons = useSelector(state => state.lesson.filteredLessons);
    const [lessonList, setLessonList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAvailableArray(filteredLessons?.data)) {
            setLessonList([]);
            return;
        }

        setLessonList([...filteredLessons.data]);
    }, [filteredLessons])


    useEffect(() => {
        if(!filter) return;
        actions.fetchLessonsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        if(!filter) return;
        actions.fetchLessonsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    return {
        lessonList,
        loading,
        refresh
    };
}

export default useFilteredLessonList;