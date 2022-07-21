import { isAvailableArray } from "helpers/arrayUtils";
import useFilteredPaymentList from "hooks/payment/useFilteredPaymentList";
import { useCallback, useEffect, useState } from "react";
import { PAYMENT_STATUSES } from "settings/payment-setting";
import useTutorList from "./useTutorList";


const useTutorClasses = (inputFilter) => {

    const [filter, setFilter] = useState(null);
    const { paymentList, loading, refresh: refreshPayments } = useFilteredPaymentList(filter);
    const { tutorList, loading: loadingTutors, refresh: refreshTutor } = useTutorList();

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        setFilter({
            ...(inputFilter || {}),
            status: PAYMENT_STATUSES.ONGOING,
        });
    }, [inputFilter])

    useEffect(() => {
        if (!isAvailableArray(paymentList)) {
            setClasses([]);
            return;
        }

        const findTutor = (tutorId) => {
            const tutor = isAvailableArray(tutorList) && tutorList.find(item => item.id === tutorId);
            return tutor || null;
        }

        setClasses(
            paymentList.map(payment => ({
                ...payment,
                tutor: findTutor(payment.tutorId)
            }))
        )
    }, [paymentList, tutorList])

    const refresh = useCallback(() => {
        refreshPayments && refreshPayments();
        refreshTutor && refreshTutor();
    }, [refreshPayments, refreshTutor]);

    return {
        classes,
        loading: loading || loadingTutors,
        refresh,
    }

}

export default useTutorClasses;