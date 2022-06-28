import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePaymentActions from "./usePaymentActions";


const usePaymentDetail = (id) => {
    const actions = usePaymentActions();
    const paymentDetail = useSelector(state => state.payment.paymentDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearPaymentDetail();
        actions.fetchPaymentDetail({ id, setLoading });
    }, [actions, id]);

    const refresh = useCallback(() => {
        if (!id) return;
        actions.clearPaymentDetail();
        actions.fetchPaymentDetail({ id, setLoading });
    }, [actions, id])

    return {
        paymentDetail,
        loading,
        refresh
    };
}

export default usePaymentDetail;