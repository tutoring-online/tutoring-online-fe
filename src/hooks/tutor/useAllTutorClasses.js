import { isAvailableArray } from "helpers/arrayUtils";
import usePaymentsByTutorId from "hooks/payment/usePaymentsByTutorId";
import { useEffect, useState } from "react";
import { PAYMENT_STATUSES } from "settings/payment-setting";


const useAllTutorClasses = (tutorId) => {
    const [filter, setFilter] = useState(null);
    const { paymentList } = usePaymentsByTutorId(filter);

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (tutorId == null) {
            setFilter(null);
            return;
        }

        setFilter({
            TutorId: tutorId,
            status: PAYMENT_STATUSES.ONGOING,
        });
    }, [tutorId])

    useEffect(() => {
        if (!isAvailableArray(paymentList)) {
            setClasses([]);
            return;
        }

        setClasses([...paymentList]);
    }, [paymentList])



    return classes;

}

export default useAllTutorClasses;