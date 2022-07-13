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
        if (!isAvailableArray(filteredPayments?.data)) {
            setPaymentList([]);
            return;
        }

        setPaymentList([...filteredPayments.data]);
    }, [filteredPayments])


    useEffect(() => {
        actions.fetchPaymentsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        actions.fetchPaymentsWithFilter({ filter, setLoading });
    }, [actions, filter]);



    return {
        paymentList,
        loading,
        refresh
    };
}

export default useFilteredPaymentList;