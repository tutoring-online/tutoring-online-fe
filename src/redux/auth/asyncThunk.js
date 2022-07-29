import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "./types.js";
import * as api from "./api.js";
import { toast } from "react-toastify";
import { equalIgnoreCase } from "helpers/stringUtils.js";

const isInvalidUser = (message) => {
    return equalIgnoreCase(message, "InvalidUser");
}

const isAlreadySignup = (message) => {
    return equalIgnoreCase(message, "UserAlreadySignup");
}

const loginUser = async (params) => {
    try {
        const response = await api.loginUser(params.token);
        return response;
    } catch (error) {
        const message = error?.response?.data?.resultMessage;
        if (isInvalidUser(message)) {
            toast.error("Account does not exist, please sign up first.");
        } else {
            toast.error(`Login failed with error: ${message || "Unknown"}`);
        }

        throw error;
    }
}

const signupUser = async (params) => {
    try {
        const response = await api.signupUser(params.token, params.role);
        return response;
    } catch (error) {
        const message = error?.response?.data?.resultMessage;
        if (isAlreadySignup(message)) {
            toast.error("This account has been signed up.");
        } else {
            toast.error(`Sign up failed with error: ${message || "Unknown"}`);
        }

        throw error;
    }
}

const asyncThunks = {
    loginUser: createAsyncThunk(types.LOGIN_USER, loginUser),
    signupUser: createAsyncThunk(types.SIGNUP_USER, signupUser)
}

export default asyncThunks;