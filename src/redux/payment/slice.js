import { createSlice } from "@reduxjs/toolkit";
import { isAvailableArray } from "helpers/arrayUtils";
import asyncThunks from "./asyncThunk";


const INITIAL_STATE = {
    payments: [],
}

const slice = createSlice({
    name: "paymentReducer",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(asyncThunks.fetchPayments.fulfilled, (state, action) => {
            console.log(action.payload);
            state.payments = isAvailableArray(action.payload) ? [...action.payload] : [];
        })

        builder.addCase(asyncThunks.fetchPayments.rejected, (state, action) => {
            console.log(action.payload);
            state.payments = [];
        })
    }
})

export const paymentReducer = slice.reducer;
export const actions = slice.actions;

export default slice;