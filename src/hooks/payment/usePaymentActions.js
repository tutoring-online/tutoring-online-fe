import { useState } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import asyncThunks from "redux/payment/asyncThunk";
import * as types from "redux/payment/types";
import { actions as reduxActions } from "redux/payment/slice";

const usePaymentActions = () => {
    const dispatch = useDispatch();
    const [actions] = useState({
        fetchPaymentDetail: compose(dispatch, asyncThunks.fetchPaymentDetail),
        clearPaymentDetail: compose(dispatch, reduxActions[types.CLEAR_PAYMENT_DETAIL]),
        
        fetchPayments: compose(dispatch, asyncThunks.fetchPayments),
        fetchPaymentsWithFilter: compose(dispatch, asyncThunks.fetchPaymentsWithFilter),
        fetchPaymentsByTutorId: compose(dispatch, asyncThunks.fetchPaymentsByTutorId),
        createPayment: compose(dispatch, asyncThunks.createPayment),
        updatePayment: compose(dispatch, asyncThunks.updatePayment),
        deletePayment: compose(dispatch, asyncThunks.deletePayment),
    })

    return actions;
}

export default usePaymentActions;