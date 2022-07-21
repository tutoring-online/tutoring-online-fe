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
        const data = (!filter || !isAvailableArray(Object.values(filter))) ?
            filteredLessons : filteredLessons?.data;

        if (!isAvailableArray(data)) {
            setLessonList([]);
            return;
        }

        setLessonList([...data]);
    }, [filter, filteredLessons])


    useEffect(() => {
        if (!filter) return;
        actions.fetchLessonsWithFilter({ filter: { Page: 0, ...filter }, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        if (!filter) return;
        actions.fetchLessonsWithFilter({ filter: { Page: 0, ...filter }, setLoading });
    }, [actions, filter]);

    return {
        lessonList,
        loading,
        refresh
    };
}

export default useFilteredLessonList;