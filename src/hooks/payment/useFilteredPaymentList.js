import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import usePaymentActions from "./usePaymentActions";

const useFilteredPaymentList = (filter) => {
    const actions = usePaymentActions();

    const filteredPayments = useSelector(state => state.payment.filteredPayments);
    const [paymentList, setPaymentList] = useState([]);
    const [loading, setLoading] = useState(false);

    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [])

    const loadingCallback = useCallback((isLoading) => {
        if (mounted.current === true) {
            setLoading(Boolean(isLoading));
        }
    }, []);

    useEffect(() => {
        if(!mounted.current) return;
        const data = (!filter || !isAvailableArray(Object.values(filter))) ?
            filteredPayments : filteredPayments?.data;

        if (!isAvailableArray(data)) {
            setPaymentList([]);
            return;
        }

        setPaymentList([...data]);
    }, [filter, filteredPayments])


    useEffect(() => {
        actions.fetchPaymentsWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);

    const refresh = useCallback(() => {
        actions.fetchPaymentsWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);

    return {
        paymentList,
        loading,
        refresh
    };
}

export default useFilteredPaymentList;