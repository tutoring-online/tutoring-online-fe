import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import usePaymentActions from "./usePaymentActions";

const useFilteredBookingsNotRedux = (filter) => {
    const actions = usePaymentActions();

    const [paymentList, setPaymentList] = useState([]);
    const [loading, setLoading] = useState(false);

    const callback = useCallback((response) => {
        const data = response?.data || response;
        if (!isAvailableArray(data)) {
            setPaymentList([]);
            return;
        }

        setPaymentList([...data]);
    }, [])

    useEffect(() => {
        actions.fetchPaymentsWithFilter({ filter, setLoading, callback });
    }, [actions, callback, filter]);

    const refresh = useCallback(() => {
        actions.fetchPaymentsWithFilter({ filter, setLoading, callback });
    }, [actions, callback, filter]);

    return {
        paymentList,
        loading,
        refresh
    };
}

export default useFilteredBookingsNotRedux;