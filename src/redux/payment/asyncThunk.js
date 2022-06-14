import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchPayments = createAsyncThunk(types.FETCH_PAYMENTS, async () => {
    try {
        const response = await api.fetchPayments();
        return response;
    } catch (error) {
        return null;
    }
})

const asyncThunks = {
    fetchPayments,
}

export default asyncThunks;