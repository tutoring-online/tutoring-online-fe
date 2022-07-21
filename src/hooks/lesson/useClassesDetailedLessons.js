import { isAvailableArray } from "helpers/arrayUtils";
import { useEffect, useState } from "react";
import { getLessonStartDate, getLessonEndDate } from 'settings/payment-setting';
import useFilteredLessonList from "./useFilteredLessonList";

export default function useClassesDetailedLessons(classes, filter) {

    const { lessonList, loading, refresh } = useFilteredLessonList(filter);
    const [detailedLessons, setDetailedLessons] = useState([]);

    console.log(lessonList);

    useEffect(() => {
        if (!isAvailableArray(classes)) {
            setDetailedLessons([]);
            return;
        }

        const detailedLessons = [];
        classes.forEach(classItem => {
            const classLessons = lessonList.filter(lesson => lesson.paymentId === classItem.id);
            console.log(classLessons);
            const preparedLessons = classLessons.map(lesson => ({
                title: 'Lesson',
                startDate: getLessonStartDate(lesson.date, classItem.dateSession),
                endDate: getLessonEndDate(lesson.date, classItem.dateSession),
                id: lesson.id,
            }))

            if (isAvailableArray(preparedLessons)) {
                detailedLessons.push(...preparedLessons);
            }
        })

        setDetailedLessons(detailedLessons);
    }, [classes, lessonList]);

    return {
        loading,
        refresh,
        detailedLessons
    }
}