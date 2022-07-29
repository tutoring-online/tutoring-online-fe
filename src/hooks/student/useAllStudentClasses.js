import { isAvailableArray } from "helpers/arrayUtils";
import usePaymentsByTutorId from "hooks/payment/usePaymentsByTutorId";
import { useEffect, useState } from "react";
import { PAYMENT_STATUSES } from "settings/payment-setting";


const useAllStudentClasses = (studentId) => {
    const [filter, setFilter] = useState(null);
    const { paymentList } = usePaymentsByTutorId(filter);

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (studentId == null) {
            setFilter(null);
            return;
        }

        setFilter({
            StudentId: studentId,
            status: PAYMENT_STATUSES.ONGOING,
        });
    }, [studentId])

    useEffect(() => {
        if (!isAvailableArray(paymentList)) {
            setClasses([]);
            return;
        }

        setClasses([...paymentList]);
    }, [paymentList])



    return classes;

}

export default useAllStudentClasses;