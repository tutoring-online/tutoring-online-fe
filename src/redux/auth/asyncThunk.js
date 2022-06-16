import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from 'react-toastify';

const loginUser = createAsyncThunk(types.LOGIN_USER, async (params) => {
    try {
        const response = await api.loginUser(params.token, params.role);
        return response;
    } catch (error) {
        toast.error("Login failed.");
        throw error;
    }
})

const asyncThunks = {
    loginUser
}

export default asyncThunks;