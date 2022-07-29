import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePaymentActions from "./usePaymentActions";

const usePaymentList = () => {
    const actions = usePaymentActions();

    const paymentList = useSelector(state => state.payment.payments);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchPayments({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchPayments({ setLoading });
    }, [actions])

    return {
        paymentList,
        loading,
        refresh
    };
}

export default usePaymentList;