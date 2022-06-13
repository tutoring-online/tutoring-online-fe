import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import toastr from 'toastr';

export const loginUser = createAsyncThunk(types.LOGIN_USER, async (params) => {
    try {
        const response = await api.loginUser(params.token, params.role);
        toastr.success("Login succeeded.");
        return response;
    } catch (error) {
        toastr.error("Login failed.");
        return null;
    }
})