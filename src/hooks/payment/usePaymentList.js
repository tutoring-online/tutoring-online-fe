import { useEffect } from "react";
import { useSelector } from "react-redux";
import usePaymentActions from "./usePaymentActions.js";

const usePaymentList = () => {
    const paymentList = useSelector(state => state.payment.payments);
    const actions = usePaymentActions();

    useEffect(() => {
        actions.fetchPayments();
    }, [actions])
    
    return paymentList;
}

export default usePaymentList;