import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchAdmins = createAsyncThunk(types.FETCH_ADMINS, async (params) => {
    const { setLoading = () => { } } = params;
    setLoading(true);
    try {
        const response = await api.fetchAdmins();
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        throw error;
    }
})

const asyncThunks = {
    fetchAdmins,
}

export default asyncThunks;