import { isAvailableArray } from "helpers/arrayUtils";
import useFilteredPaymentList from "hooks/payment/useFilteredPaymentList";
import { useEffect, useState } from "react";
import { PAYMENT_STATUSES } from "settings/payment-setting";


const useTutorClasses = (tutorId, inputFilter) => {

    const [filter, setFilter] = useState(null);
    const { paymentList, loading, refresh } = useFilteredPaymentList(filter);

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (tutorId == null) {
            setFilter(null);
            return;
        }

        setFilter({
            TutorId: tutorId,
            status: PAYMENT_STATUSES.ONGOING,
            ...(inputFilter || {})
        });
    }, [inputFilter, tutorId])

    useEffect(() => {
        if (!isAvailableArray(paymentList)) {
            setClasses([]);
            return;
        }

        setClasses([...paymentList]);
    }, [paymentList])

    return {
        classes,
        loading,
        refresh
    }

}

export default useTutorClasses;