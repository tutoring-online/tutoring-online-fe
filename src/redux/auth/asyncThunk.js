import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";

const loginUser = async (params) => {
    const response = await api.loginUser(params.token, params.role);
    return response;
}

const asyncThunks = {
    loginUser: createAsyncThunk(types.LOGIN_USER, loginUser)
}

export default asyncThunks;