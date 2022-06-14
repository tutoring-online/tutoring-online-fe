import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const fetchAdmins = createAsyncThunk(types.FETCH_ADMINS, async () => {
    try {
        const response = await api.fetchAdmins();
        return response;
    } catch (error) {
        return null;
    }
})

const asyncThunks = {
    fetchAdmins,
}

export default asyncThunks;