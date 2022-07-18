import { isAvailableArray } from "helpers/arrayUtils";
import usePaymentList from "hooks/payment/usePaymentList";
import useTutorSubjectList from "hooks/tutor-subject/useTutorSubjectList";
import { useCallback, useEffect, useState } from "react";
import useFilteredSyllabusList from "./useFilteredSyllabusList";

const useSyllabusesWithDetails = (filter) => {
    const {
        syllabusList,
        loading: loadingSyllabusList,
        refresh: refreshSyllabusList,
    } = useFilteredSyllabusList(filter);

    const {
        paymentList,
        loading: loadingPaymentList,
        refresh: refreshPaymentList,
    } = usePaymentList()

    const {
        tutorSubjectList,
        loading: loadingTutorSubjectList,
        refresh: refreshTutorSubjectList,
    } = useTutorSubjectList()

    const [syllabusesWithDetails, setSyllabusesWithDetails] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(() => {
            return loadingSyllabusList || loadingPaymentList || loadingTutorSubjectList;
        })
    }, [loadingPaymentList, loadingSyllabusList, loadingTutorSubjectList])

    

    useEffect(() => {
        if(!isAvailableArray(syllabusList) || !isAvailableArray(paymentList) || !isAvailableArray(tutorSubjectList)) {
            setSyllabusesWithDetails([]);
            return;
        }

        const temp = [];
        syllabusList.forEach(syllabus => {
            let countStudents = 0;
            let countTutors = 0;

            paymentList.forEach(payment => {
                if(payment.syllabusId === syllabus.id){
                    countStudents++;
                }
            })

            tutorSubjectList.forEach(tutorSubject => {
                if(tutorSubject.subjectId === syllabus.subjectId) {
                    countTutors++;
                }
            })

            temp.push({
                ...syllabus,
                countStudents,
                countTutors
            })
        })

        setSyllabusesWithDetails(temp);
    }, [paymentList, syllabusList, tutorSubjectList])

    const refresh = useCallback(() => {
        refreshSyllabusList && refreshSyllabusList();
        refreshPaymentList && refreshPaymentList();
        refreshTutorSubjectList && refreshTutorSubjectList();
    }, [refreshPaymentList, refreshSyllabusList, refreshTutorSubjectList])

    return {
        syllabusesWithDetails,
        loading,
        refresh,
    };
}

export default useSyllabusesWithDetails;