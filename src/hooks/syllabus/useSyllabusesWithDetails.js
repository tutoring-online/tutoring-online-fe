import { isAvailableArray } from "helpers/arrayUtils";
import usePaymentList from "hooks/payment/usePaymentList";
import { useCallback, useEffect, useState } from "react";

const useSyllabusList = () => {
    const {
        syllabusList,
        loading: loadingSyllabusList,
        refresh: refreshSyllabusList,
    } = useSyllabusList();
    const {
        paymentList,
        loading: loadingPaymentList,
        refresh: refreshPaymentList,
    } = usePaymentList()

    const [syllabusesWithDetails, setSyllabusesWithDetails] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(() => {
            return loadingSyllabusList && loadingPaymentList;
        })
    }, [loadingPaymentList, loadingSyllabusList])

    useEffect(() => {
        if(!isAvailableArray(syllabusList) || !isAvailableArray(paymentList)) {
            setSyllabusesWithDetails([]);
            return;
        }

        const temp = [];
        const count = 0;
        syllabusList.forEach(syllabus => {

        })
    }, [])


    const refresh = useCallback(() => {
        refreshSyllabusList && refreshSyllabusList();
        refreshPaymentList && refreshPaymentList();
    }, [refreshPaymentList, refreshSyllabusList])

    return {
        syllabusesWithDetails,
        loading,
        refresh,
    };
}

export default useSyllabusList;