import { createSlice } from "@reduxjs/toolkit";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    payments: [],
    paymentDetail: null,
}

const reducers = {
    fetchPaymentsSuccessful: (state, action) => {
        state.payments = action.payload;
    },
    fetchPaymentsFailed: (state) => {
        state.payments = [];
    },

    fetchPaymentDetailSuccessful: (state, action) => {
        state.paymentDetail = action.payload || null
    },
    fetchPaymentDetailFailed: (state) => {
        state.paymentDetail = null
    },

    createPaymentSuccessful: () => {},
    createPaymentFailed: () => {},

    updatePaymentSuccessful: (state, action) => {
        state.paymentDetail = action.payload
    },
    updatePaymentFailed: () => {},

    deletePaymentSuccessful: () => {},
    deletePaymentFailed: () => {},
}


const slice = createSlice({
    name: "paymentReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchPayments.fulfilled, reducers.fetchPaymentsSuccessful);
        builder.addCase(asyncThunks.fetchPayments.rejected, reducers.fetchPaymentsFailed);

        builder.addCase(asyncThunks.fetchPaymentDetail.fulfilled, reducers.fetchPaymentDetailSuccessful);
        builder.addCase(asyncThunks.fetchPaymentDetail.rejected, reducers.fetchPaymentDetailFailed);

        builder.addCase(asyncThunks.createPayment.fulfilled, reducers.createPaymentSuccessful);
        builder.addCase(asyncThunks.createPayment.rejected, reducers.createPaymentFailed);

        builder.addCase(asyncThunks.updatePayment.fulfilled, reducers.updatePaymentSuccessful);
        builder.addCase(asyncThunks.updatePayment.rejected, reducers.updatePaymentFailed);

        builder.addCase(asyncThunks.deletePayment.fulfilled, reducers.deletePaymentSuccessful);
        builder.addCase(asyncThunks.deletePayment.rejected, reducers.deletePaymentFailed);
    }
})

export const paymentReducer = slice.reducer;
export const actions = slice.actions;

export default slice;