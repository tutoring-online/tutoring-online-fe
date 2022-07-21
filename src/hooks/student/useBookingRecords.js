import { isAvailableArray } from "helpers/arrayUtils";
import useFilteredPaymentList from "hooks/payment/useFilteredPaymentList";
import useTutorList from "hooks/tutor/useTutorList";
import { useEffect, useState } from "react";


const useBookingRecords = (studentId) => {
    const [filter, setFilter] = useState(null);
    const { paymentList, loading: loadingPayment } = useFilteredPaymentList(filter);
    const { tutorList, loading: loadingTutors } = useTutorList();

    const [bookingRecords, setBookingRecords] = useState([]);

    useEffect(() => {
        if (!studentId) {
            setFilter(null);
            return;
        }

        setFilter({
            StudentId: studentId,
        });
    }, [studentId])

    useEffect(() => {
        if (!isAvailableArray(paymentList)) {
            setBookingRecords([]);
            return;
        }

        const findTutor = (tutorId) => {
            const tutor = isAvailableArray(tutorList) && tutorList.find(item => item.id === tutorId);
            return tutor || null;
        }

        setBookingRecords(
            paymentList.map(payment => ({
                ...payment,
                tutor: findTutor(payment.tutorId)
            }))
        )

    }, [paymentList, tutorList])

    return {
        bookingRecords,
        loading: loadingPayment || loadingTutors,
    }
}

export default useBookingRecords;
