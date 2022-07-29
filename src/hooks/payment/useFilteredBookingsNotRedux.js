import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import usePaymentActions from "./usePaymentActions";

const useFilteredBookingsNotRedux = (filter) => {
    const actions = usePaymentActions();

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

    const callback = useCallback((response) => {
        if (mounted.current === true) {
            const data = response?.data || response;
            if (!isAvailableArray(data)) {
                setPaymentList([]);
                return;
            }

            setPaymentList([...data]);
        }
    }, [])

    useEffect(() => {
        actions.fetchPaymentsWithFilter({
            filter,
            setLoading: loadingCallback,
            callback
        });
    }, [actions, callback, filter, loadingCallback]);

    const refresh = useCallback(() => {
        actions.fetchPaymentsWithFilter({
            filter,
            setLoading: loadingCallback,
            callback
        });
    }, [actions, callback, filter, loadingCallback]);

    return {
        paymentList,
        loading,
        refresh
    };
}

export default useFilteredBookingsNotRedux;