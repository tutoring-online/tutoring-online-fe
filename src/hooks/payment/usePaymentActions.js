import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/payment/asyncThunk";

const usePaymentActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchPayments: compose(dispatch, asyncThunks.fetchPayments),
        fetchPaymentDetail: compose(dispatch, asyncThunks.fetchPaymentDetail),
        createPayment: compose(dispatch, asyncThunks.createPayment),
        updatePayment: compose(dispatch, asyncThunks.updatePayment),
        deletePayment: compose(dispatch, asyncThunks.deletePayment),
    })

    return actions;
}

export default usePaymentActions;