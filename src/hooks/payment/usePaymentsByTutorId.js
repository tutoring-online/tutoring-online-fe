import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePaymentActions from "./usePaymentActions";

const usePaymentsByTutorId = (filter) => {
    const actions = usePaymentActions();

    const tutorClasses = useSelector(state => state.payment.tutorClasses);
    const [paymentList, setPaymentList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = (!filter || !isAvailableArray(Object.values(filter))) ?
        tutorClasses : tutorClasses?.data; 
            
        if (!isAvailableArray(data)) {
            setPaymentList([]);
            return;
        }

        setPaymentList([...data]);
    }, [filter, tutorClasses])


    useEffect(() => {
        actions.fetchPaymentsByTutorId({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        actions.fetchPaymentsByTutorId({ filter, setLoading });
    }, [actions, filter]);

    return {
        paymentList,
        loading,
        refresh
    };
}

export default usePaymentsByTutorId;