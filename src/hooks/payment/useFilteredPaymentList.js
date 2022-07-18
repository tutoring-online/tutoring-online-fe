import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePaymentActions from "./usePaymentActions";

const useFilteredPaymentList = (filter) => {
    const actions = usePaymentActions();

    const filteredPayments = useSelector(state => state.payment.filteredPayments);
    const [paymentList, setPaymentList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = (!filter || !isAvailableArray(Object.values(filter))) ?
        filteredPayments : filteredPayments?.data; 
            
        if (!isAvailableArray(data)) {
            setPaymentList([]);
            return;
        }

        setPaymentList([...data]);
    }, [filter, filteredPayments])


    useEffect(() => {
        if(!filter) return;
        actions.fetchPaymentsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        if(!filter) return;
        actions.fetchPaymentsWithFilter({ filter, setLoading });
    }, [actions, filter]);



    return {
        paymentList,
        loading,
        refresh
    };
}

export default useFilteredPaymentList;